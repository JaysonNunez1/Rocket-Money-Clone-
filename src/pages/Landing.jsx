import { Link } from "react-router-dom";
import {
  Coins,
  Sparkles,
  CalendarRange,
  Users,
  BellRing,
  ShieldCheck,
  Check,
  X,
  ArrowRight,
  TrendingUp,
  Wallet,
} from "lucide-react";

function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full glass">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 text-xl font-extrabold">
          <Coins className="h-6 w-6 text-mint-400" />
          Centavo
        </a>
        <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#compare" className="hover:text-white">vs Rocket Money</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
        </div>
        <Link
          to="/app"
          className="rounded-full bg-mint-500 px-5 py-2 text-sm font-semibold text-ink-950 transition hover:bg-mint-400"
        >
          Try the demo
        </Link>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="relative overflow-hidden pt-36 pb-24">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-mint-500/15 blur-3xl" />
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="mx-auto mb-6 w-fit rounded-full border border-mint-500/30 bg-mint-500/10 px-4 py-1.5 text-sm text-mint-300">
          Every cent, accounted for
        </p>
        <h1 className="mx-auto max-w-3xl text-5xl font-black leading-tight md:text-6xl">
          Budgeting that tells you <span className="gradient-text">why</span>, not just what
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
          Other apps show you charts of money you already lost. Centavo forecasts
          your cash flow, explains your spending in plain English, and never takes
          a cut of your savings.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/app"
            className="glow flex items-center gap-2 rounded-full bg-mint-500 px-8 py-4 text-lg font-bold text-ink-950 transition hover:bg-mint-400"
          >
            See the live demo <ArrowRight className="h-5 w-5" />
          </Link>
          <a
            href="#compare"
            className="rounded-full border border-white/15 px-8 py-4 text-lg font-semibold text-white/80 transition hover:bg-white/5"
          >
            Why not Rocket Money?
          </a>
        </div>
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4">
          {[
            ["$0", "fee on bill savings — keep 100%"],
            ["Unlimited", "budget categories, free forever"],
            ["21 days", "average low-balance warning lead time"],
          ].map(([stat, label]) => (
            <div key={label} className="glass rounded-2xl p-5">
              <div className="text-2xl font-extrabold text-mint-300">{stat}</div>
              <div className="mt-1 text-sm text-white/50">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

const features = [
  {
    icon: Sparkles,
    title: "Insights that explain, not just report",
    body: "“Dining is up 34% — mostly weekend delivery.” Plain-English analysis of every trend, with one concrete fix attached.",
  },
  {
    icon: CalendarRange,
    title: "Cash-flow forecast calendar",
    body: "See your projected balance for every day of the month. Get warned about low-balance days before they happen, not after the overdraft.",
  },
  {
    icon: Users,
    title: "Built for two (or more)",
    body: "Shared budgets with per-person views. Partners see the same numbers without sharing logins or passwords.",
  },
  {
    icon: BellRing,
    title: "Price-hike radar",
    body: "We flag every subscription price increase the moment it happens, and hand you a proven script to negotiate it back down — free.",
  },
  {
    icon: Wallet,
    title: "Keep 100% of your savings",
    body: "Rocket Money takes 35–60% of what its negotiators save you. Centavo gives you the playbook and takes $0.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-level security",
    body: "256-bit encryption, read-only bank connections, and your data is never sold. Cancel in one tap — no dark patterns.",
  },
];

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-center text-4xl font-extrabold">
        Everything Rocket Money does. <span className="gradient-text">Plus everything it doesn't.</span>
      </h2>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, body }) => (
          <div key={title} className="glass rounded-2xl p-7 transition hover:border-mint-500/40">
            <Icon className="h-8 w-8 text-mint-400" />
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const comparison = [
  ["Unlimited budget categories on free plan", true, false],
  ["Cash-flow forecast with low-balance warnings", true, false],
  ["Plain-English AI spending insights", true, false],
  ["Shared budgets for couples", true, false],
  ["Subscription price-hike alerts", true, false],
  ["Fee on negotiated bill savings", "0%", "35–60%"],
  ["Subscription tracking & cancellation", true, true],
  ["Credit score monitoring", true, true],
];

function Compare() {
  return (
    <section id="compare" className="mx-auto max-w-4xl px-6 py-24">
      <h2 className="text-center text-4xl font-extrabold">
        Centavo <span className="text-white/40">vs</span> Rocket Money
      </h2>
      <div className="glass mt-12 overflow-hidden rounded-2xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="px-6 py-4 font-semibold text-white/60">Feature</th>
              <th className="px-6 py-4 font-bold text-mint-300">Centavo</th>
              <th className="px-6 py-4 font-semibold text-white/60">Rocket Money</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map(([label, us, them]) => (
              <tr key={label} className="border-b border-white/5 last:border-0">
                <td className="px-6 py-4 text-white/80">{label}</td>
                <td className="px-6 py-4">
                  {us === true ? <Check className="h-5 w-5 text-mint-400" /> : <span className="font-bold text-mint-300">{us}</span>}
                </td>
                <td className="px-6 py-4">
                  {them === true ? <Check className="h-5 w-5 text-white/40" /> : them === false ? <X className="h-5 w-5 text-rose-400/70" /> : <span className="font-bold text-rose-300">{them}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const plans = [
  {
    name: "Free",
    price: "$0",
    tagline: "A real budget, not a teaser",
    items: [
      "Unlimited budget categories",
      "Subscription tracking & price-hike alerts",
      "Cash-flow forecast calendar",
      "Bill negotiation scripts library",
      "Net worth & credit score view",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Plus",
    price: "$6/mo",
    tagline: "One honest price. No % cut, ever.",
    items: [
      "Everything in Free",
      "AI insights & weekly money briefing",
      "Shared budgets for couples",
      "Savings autopilot & round-ups",
      "Debt payoff planner (snowball / avalanche)",
      "Priority human support",
    ],
    cta: "Try Plus free for 14 days",
    featured: true,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-4xl px-6 py-24">
      <h2 className="text-center text-4xl font-extrabold">Transparent pricing</h2>
      <p className="mt-4 text-center text-white/50">
        No “pay what you think is fair” games. No 35–60% cut of your savings.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl p-8 ${p.featured ? "glow border border-mint-500/40 bg-mint-500/5" : "glass"}`}
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-bold">{p.name}</h3>
              <span className="text-3xl font-black text-mint-300">{p.price}</span>
            </div>
            <p className="mt-1 text-sm text-white/50">{p.tagline}</p>
            <ul className="mt-6 space-y-3 text-sm">
              {p.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-white/75">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-400" /> {item}
                </li>
              ))}
            </ul>
            <Link
              to="/app"
              className={`mt-8 block rounded-full py-3 text-center font-bold transition ${
                p.featured
                  ? "bg-mint-500 text-ink-950 hover:bg-mint-400"
                  : "border border-white/15 text-white/80 hover:bg-white/5"
              }`}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <div className="flex items-center gap-2 text-lg font-extrabold">
          <Coins className="h-5 w-5 text-mint-400" /> Centavo
        </div>
        <p className="max-w-md text-sm text-white/40">
          Every cent, accounted for. Demo project — not a real financial service.
        </p>
        <div className="flex items-center gap-2 text-xs text-white/30">
          <TrendingUp className="h-4 w-4" /> Built to out-budget Rocket Money.
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Compare />
      <Pricing />
      <Footer />
    </main>
  );
}
