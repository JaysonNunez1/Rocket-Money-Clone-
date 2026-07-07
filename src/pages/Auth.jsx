import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Coins } from "lucide-react";
import { api, setSession } from "../lib/api.js";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const path = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
      const { token, user } = await api(path, { method: "POST", body: form });
      setSession(token, user);
      navigate("/accounts");
    } catch (err) {
      setError(
        err.message.includes("Failed to fetch")
          ? "Can't reach the Centavo API. Start it with: npm run dev:all"
          : err.message
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2 text-2xl font-extrabold">
          <Coins className="h-7 w-7 text-mint-400" /> Centavo
        </Link>
        <div className="glass rounded-2xl p-8">
          <div className="mb-6 grid grid-cols-2 rounded-full bg-white/5 p-1 text-sm font-semibold">
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                className={`rounded-full py-2 transition ${mode === m ? "bg-mint-500 text-ink-950" : "text-white/60"}`}
              >
                {m === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>
          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={set("name")}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-mint-500/60"
              />
            )}
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={set("email")}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-mint-500/60"
            />
            <input
              required
              type="password"
              placeholder={mode === "signup" ? "Password (8+ characters)" : "Password"}
              value={form.password}
              onChange={set("password")}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-mint-500/60"
            />
            {error && <p className="text-sm text-rose-300">{error}</p>}
            <button
              disabled={busy}
              className="w-full rounded-full bg-mint-500 py-3 font-bold text-ink-950 transition hover:bg-mint-400 disabled:opacity-50"
            >
              {busy ? "One moment…" : mode === "login" ? "Log in" : "Create account"}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center text-xs text-white/40">
          Demo project — runs locally. Your data stays on your machine.
        </p>
      </div>
    </main>
  );
}
