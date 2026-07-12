import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePlaidLink } from "react-plaid-link";
import { ArrowLeft, Landmark, Plus, LogOut, RefreshCw } from "lucide-react";
import { api, getUser, clearSession } from "../lib/api.js";
import Logo from "../components/Logo.jsx";

const money = (n) =>
  Number(n ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 });

function PlaidButton({ onLinked, setError }) {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    api("/api/plaid/create_link_token", { method: "POST" })
      .then((d) => setLinkToken(d.link_token))
      .catch((e) => setError(e.message));
  }, [setError]);

  const onSuccess = useCallback(
    async (public_token, metadata) => {
      try {
        await api("/api/plaid/exchange", {
          method: "POST",
          body: { public_token, institution: metadata.institution?.name },
        });
        onLinked();
      } catch (e) {
        setError(e.message);
      }
    },
    [onLinked, setError]
  );

  const { open, ready } = usePlaidLink({ token: linkToken, onSuccess });

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="flex items-center gap-2 rounded-full bg-mint-500 px-6 py-3 font-bold text-ink-950 transition hover:bg-mint-400 disabled:opacity-40"
    >
      <Plus className="h-5 w-5" /> Connect a bank
    </button>
  );
}

export default function Accounts() {
  const user = getUser();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [txns, setTxns] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const a = await api("/api/plaid/accounts");
      setAccounts(a.accounts);
      if (a.accounts.length) {
        const t = await api("/api/plaid/transactions");
        setTxns(t.transactions);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (!user) return null;

  return (
    <main className="min-h-screen pb-16">
      <nav className="glass sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <div className="flex items-center gap-5 text-sm text-white/60">
            <Link to="/app" className="flex items-center gap-1.5 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Dashboard
            </Link>
            <button
              onClick={() => { clearSession(); navigate("/"); }}
              className="flex items-center gap-1.5 hover:text-white"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">Hi {user.name} — your accounts</h1>
            <p className="mt-1 text-white/50">Connected through Plaid. Read-only — Centavo can never move your money.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refresh}
              className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm text-white/70 hover:bg-white/5"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
            <PlaidButton onLinked={refresh} setError={setError} />
          </div>
        </div>

        {error && (
          <div className="glass mt-6 rounded-2xl border-gold-400/30 p-5 text-sm text-gold-400">{error}</div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {accounts.map((a) => (
            <div key={`${a.institution}-${a.name}-${a.mask}`} className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <Landmark className="h-8 w-8 text-mint-400" />
                <div>
                  <p className="font-bold">{a.name}</p>
                  <p className="text-xs text-white/40">
                    {a.institution} · {a.type} {a.mask ? `····${a.mask}` : ""}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-2xl font-black text-mint-300">${money(a.balance)}</p>
              {a.available != null && (
                <p className="text-xs text-white/40">${money(a.available)} available</p>
              )}
            </div>
          ))}
          {!accounts.length && !error && (
            <div className="glass rounded-2xl p-8 text-white/50 sm:col-span-2">
              No banks connected yet. Click <span className="font-semibold text-mint-300">Connect a bank</span> to
              link one — in sandbox mode, pick any bank and log in with <code>user_good</code> / <code>pass_good</code>.
            </div>
          )}
        </div>

        {txns.length > 0 && (
          <div className="glass mt-8 overflow-hidden rounded-2xl">
            <h3 className="px-6 pt-5 text-sm font-semibold uppercase tracking-wider text-white/40">
              Last 30 days
            </h3>
            <table className="mt-3 w-full text-sm">
              <tbody>
                {txns.slice(0, 20).map((t, i) => (
                  <tr key={`${t.date}-${t.name}-${t.amount}-${i}`} className="border-t border-white/5">
                    <td className="px-6 py-3 text-white/40">{t.date}</td>
                    <td className="px-6 py-3 font-medium">{t.name}</td>
                    <td className="px-6 py-3 text-white/40">{t.category}</td>
                    <td className={`px-6 py-3 text-right font-semibold ${t.amount < 0 ? "text-mint-300" : ""}`}>
                      {t.amount < 0 ? "+" : "-"}${Math.abs(t.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
