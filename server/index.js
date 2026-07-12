import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { store } from "./store.js";

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "dev-only-secret-change-me";
const PORT = process.env.PORT || 4000;

const plaidConfigured = Boolean(process.env.PLAID_CLIENT_ID && process.env.PLAID_SECRET);
const plaid = plaidConfigured
  ? new PlaidApi(
      new Configuration({
        basePath: PlaidEnvironments[process.env.PLAID_ENV || "sandbox"],
        baseOptions: {
          headers: {
            "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
            "PLAID-SECRET": process.env.PLAID_SECRET,
          },
        },
      })
    )
  : null;

// ---------- auth ----------

function sign(user) {
  return jwt.sign({ sub: user.id, name: user.name, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

function authResponse(user) {
  return { token: sign(user), user: { id: user.id, name: user.name, email: user.email } };
}

function requireAuth(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Please log in." });
  }
}

app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: "Name, email, and password are required." });
  if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters." });
  if (store.findUserByEmail(email)) return res.status(409).json({ error: "An account with that email already exists." });
  const user = store.createUser({ name, email, passwordHash: await bcrypt.hash(password, 10) });
  res.json(authResponse(user));
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  const user = email && store.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
    return res.status(401).json({ error: "Invalid email or password." });
  }
  res.json(authResponse(user));
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ user: { id: req.user.sub, name: req.user.name, email: req.user.email } });
});

// ---------- plaid ----------

function needPlaid(res) {
  res.status(503).json({
    error: "Plaid isn't configured yet. Copy .env.example to .env and add your free sandbox keys from dashboard.plaid.com.",
  });
}

function plaidError(res, e) {
  res.status(500).json({ error: e.response?.data?.error_message || e.message });
}

app.post("/api/plaid/create_link_token", requireAuth, async (req, res) => {
  if (!plaid) return needPlaid(res);
  try {
    const r = await plaid.linkTokenCreate({
      user: { client_user_id: req.user.sub },
      client_name: "Centavo",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    });
    res.json({ link_token: r.data.link_token });
  } catch (e) {
    plaidError(res, e);
  }
});

app.post("/api/plaid/exchange", requireAuth, async (req, res) => {
  if (!plaid) return needPlaid(res);
  try {
    const r = await plaid.itemPublicTokenExchange({ public_token: req.body.public_token });
    store.addPlaidItem({
      userId: req.user.sub,
      accessToken: r.data.access_token,
      itemId: r.data.item_id,
      institution: req.body.institution || "Bank",
    });
    res.json({ ok: true });
  } catch (e) {
    plaidError(res, e);
  }
});

app.get("/api/plaid/accounts", requireAuth, async (req, res) => {
  if (!plaid) return needPlaid(res);
  try {
    const items = store.getPlaidItems(req.user.sub);
    const results = await Promise.all(
      items.map((item) =>
        plaid.accountsGet({ access_token: item.accessToken }).then((r) =>
          r.data.accounts.map((a) => ({
            institution: item.institution,
            name: a.name,
            type: a.subtype || a.type,
            mask: a.mask,
            balance: a.balances.current,
            available: a.balances.available,
          }))
        )
      )
    );
    res.json({ accounts: results.flat() });
  } catch (e) {
    plaidError(res, e);
  }
});

app.get("/api/plaid/transactions", requireAuth, async (req, res) => {
  if (!plaid) return needPlaid(res);
  try {
    const items = store.getPlaidItems(req.user.sub);
    const end = new Date().toISOString().slice(0, 10);
    const start = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
    const results = await Promise.all(
      items.map((item) =>
        plaid
          .transactionsGet({
            access_token: item.accessToken,
            start_date: start,
            end_date: end,
            options: { count: 50 },
          })
          .then((r) =>
            r.data.transactions.map((t) => ({
              date: t.date,
              name: t.merchant_name || t.name,
              amount: t.amount,
              category: t.personal_finance_category?.primary || t.category?.[0] || "Other",
            }))
          )
      )
    );
    const txns = results.flat().sort((a, b) => (a.date < b.date ? 1 : -1));
    res.json({ transactions: txns });
  } catch (e) {
    plaidError(res, e);
  }
});

app.listen(PORT, () => {
  console.log(`Centavo API running on http://localhost:${PORT}`);
  if (!plaidConfigured) console.log("⚠ Plaid keys not set — bank connections disabled until you fill in .env");
});
