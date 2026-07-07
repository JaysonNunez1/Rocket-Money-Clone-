import { Link } from "react-router-dom";
import {
  Coins,
  ArrowLeft,
  Sparkles,
  AlertTriangle,
  Info,
  BellRing,
  Target,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  spendingByMonth,
  categories,
  subscriptions,
  cashFlowForecast,
  goals,
  insights,
} from "../data/demo.js";

const tooltipStyle = {
  background: "#101e23",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  color: "#e7f0ee",
};

function Card({ title, children, className = "" }) {
  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
        {title}
      </h3>
      {children}
    </div>
  );
}

function InsightIcon({ tone }) {
  if (tone === "alert") return <AlertTriangle className="h-5 w-5 shrink-0 text-rose-400" />;
  if (tone === "warn") return <BellRing className="h-5 w-5 shrink-0 text-gold-400" />;
  return <Info className="h-5 w-5 shrink-0 text-mint-400" />;
}

export default function Dashboard() {
  const totalBudget = categories.reduce((s, c) => s + c.budget, 0);
  const totalSpent = categories.reduce((s, c) => s + c.spent, 0);

  return (
    <main className="min-h-screen pb-16">
      <nav className="glass sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-xl font-extrabold">
            <Coins className="h-6 w-6 text-mint-400" /> Centavo
            <span className="ml-2 rounded-full bg-mint-500/15 px-3 py-0.5 text-xs font-semibold text-mint-300">
              Demo
            </span>
          </div>
          <div className="flex items-center gap-5 text-sm text-white/60">
            <Link to="/accounts" className="hover:text-white">My accounts</Link>
            <Link to="/" className="flex items-center gap-1.5 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Back to site
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 pt-10">
        <h1 className="text-3xl font-extrabold">Good morning, Jayo</h1>
        <p className="mt-1 text-white/50">
          June spending: <span className="font-bold text-mint-300">${totalSpent.toLocaleString()}</span> of ${totalBudget.toLocaleString()} budgeted — you're on track.
        </p>

        {/* AI insights — the differentiator, so it goes first */}
        <Card title="This week's insights" className="mt-8">
          <div className="grid gap-4 md:grid-cols-3">
            {insights.map((ins) => (
              <div key={ins.title} className="rounded-xl bg-white/[0.03] p-4">
                <div className="flex items-start gap-3">
                  <InsightIcon tone={ins.tone} />
                  <div>
                    <p className="text-sm font-semibold leading-snug">{ins.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-white/50">{ins.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card title="Cash-flow forecast — July">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={cashFlowForecast}>
                <defs>
                  <linearGradient id="mint" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="balance" stroke="#34d399" strokeWidth={2.5} fill="url(#mint)" />
              </AreaChart>
            </ResponsiveContainer>
            <p className="mt-2 text-xs text-rose-300/80">
              ⚠ Projected low of $410 on Jul 21 — Centavo suggested a fix above.
            </p>
          </Card>

          <Card title="Spending vs income">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={spendingByMonth}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="income" fill="rgba(255,255,255,0.15)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="spent" fill="#34d399" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card title="Budget categories — unlimited, free">
            <div className="space-y-4">
              {categories.map((c) => {
                const pct = Math.min(100, Math.round((c.spent / c.budget) * 100));
                const over = c.spent > c.budget;
                return (
                  <div key={c.name}>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">{c.name}</span>
                      <span className={over ? "font-semibold text-rose-300" : "text-white/50"}>
                        ${c.spent} / ${c.budget}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 rounded-full bg-white/5">
                      <div
                        className="h-2 rounded-full"
                        style={{ width: `${pct}%`, background: over ? "#fb7185" : c.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card title="Subscriptions & price-hike radar">
            <div className="space-y-3">
              {subscriptions.map((s) => (
                <div key={s.name} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold">{s.name}</p>
                    <p className="text-xs text-white/40">Renews {s.next}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">${s.price}</p>
                    {s.hike && (
                      <p className="text-xs font-semibold text-gold-400">
                        ↑ was ${s.oldPrice}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <p className="text-xs text-white/40">
                <Sparkles className="mr-1 inline h-3.5 w-3.5 text-mint-400" />
                2 price hikes detected. Negotiation scripts ready — keep 100% of what you save.
              </p>
            </div>
          </Card>

          <Card title="Goals">
            <div className="space-y-5">
              {goals.map((g) => {
                const pct = Math.round((g.saved / g.target) * 100);
                return (
                  <div key={g.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-white/80">
                        <Target className="h-4 w-4 text-mint-400" /> {g.name}
                      </span>
                      <span className="text-white/50">{pct}%</span>
                    </div>
                    <div className="mt-1.5 h-2 rounded-full bg-white/5">
                      <div className="h-2 rounded-full bg-mint-500" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="mt-1 text-xs text-white/40">
                      ${g.saved.toLocaleString()} of ${g.target.toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
