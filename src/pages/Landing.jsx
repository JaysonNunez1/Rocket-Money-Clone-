import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
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
import Logo from "../components/Logo.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function Reveal({ children, className = "", ...rest }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

function Counter({ value, suffix = "", duration = 1400 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStarted(true),
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-50 w-full glass"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#">
          <Logo />
        </a>
        <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#gaps" className="hover:text-white">Why Centavo</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-white/70 hover:text-white">
            Log in
          </Link>
          <Link
            to="/app"
            className="rounded-full bg-mint-500 px-5 py-2 text-sm font-semibold text-ink-950 transition hover:bg-mint-400"
          >
            Try the demo
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <header className="relative overflow-hidden pt-36 pb-24">
      <div className="hero-orb pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] rounded-full bg-mint-500/15 blur-3xl" />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-6xl px-6 text-center"
      >
        <motion.p
          variants={fadeUp}
          className="mx-auto mb-6 w-fit rounded-full border border-mint-500/30 bg-mint-500/10 px-4 py-1.5 text-sm text-mint-300"
        >
          Every cent, accounted for
        </motion.p>
        <motion.h1 variants={fadeUp} className="mx-auto max-w-3xl text-5xl font-black leading-tight md:text-6xl">
          Budgeting that tells you <span className="gradient-text">why</span>, not just what
        </motion.h1>
        <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
          Every budgeting app shows you charts of money you already lost. Centavo
          forecasts your cash flow, explains your spending in plain English, and
          never takes a cut of your savings.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/app"
            className="pulse-glow flex items-center gap-2 rounded-full bg-mint-500 px-8 py-4 text-lg font-bold text-ink-950 transition hover:bg-mint-400"
          >
            See the live demo <ArrowRight className="h-5 w-5" />
          </Link>
          <a
            href="#gaps"
            className="rounded-full border border-white/15 px-8 py-4 text-lg font-semibold text-white/80 transition hover:bg-white/5"
          >
            What other apps miss
          </a>
        </motion.div>
        <motion.div variants={fadeUp} className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4">
          <div className="glass card-lift rounded-2xl p-5">
            <div className="text-2xl font-extrabold text-mint-300">$0</div>
            <div className="mt-1 text-sm text-white/50">fee on bill savings — keep 100%</div>
          </div>
          <div className="glass card-lift rounded-2xl p-5">
            <div className="text-2xl font-extrabold text-mint-300">Unlimited</div>
            <div className="mt-1 text-sm text-white/50">budget categories, free forever</div>
          </div>
          <div className="glass card-lift rounded-2xl p-5">
            <div className="text-2xl font-extrabold text-mint-300"><Counter value={21} /> days</div>
            <div className="mt-1 text-sm text-white/50">average low-balance warning lead time</div>
          </div>
        </motion.div>
      </motion.div>
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
    body: "Bill-negotiation services take 35–60% of what they save you. Centavo gives you the playbook and takes $0.",
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
      <Reveal>
        <h2 className="text-center text-4xl font-extrabold">
          Everything the other apps do. <span className="gradient-text">Plus everything they don't.</span>
        </h2>
      </Reveal>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map(({ icon: Icon, title, body }) => (
          <motion.div key={title} variants={fadeUp} className="glass card-lift rounded-2xl p-7">
            <Icon className="h-8 w-8 text-mint-400" />
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{body}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

const gaps = [
  {
    problem: "Charts tell you what you spent — never why, or what to do about it",
    answer: "Plain-English insights with one concrete fix attached to every trend",
  },
  {
    problem: "Everything looks backward. No app warns you before money gets tight",
    answer: "Day-by-day cash-flow forecast that flags low-balance days weeks ahead",
  },
  {
    problem: "Free tiers cap categories or force manual entry to push you to premium",
    answer: "Unlimited categories and automatic transaction sync, free forever",
  },
  {
    problem: "Bill-negotiation services quietly take 35–60% of what they save you",
    answer: "Proven negotiation scripts included free — you keep every dollar",
  },
  {
    problem: "Couples juggle shared logins because real multi-user budgeting barely exists",
    answer: "Shared budgets with per-person views, built in from day one",
  },
  {
    problem: "Apps lock you to one platform or bury you in rigid budgeting philosophy",
    answer: "Works everywhere the web works, and adapts to how you budget",
  },
];

function Gaps() {
  return (
    <section id="gaps" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <h2 className="text-center text-4xl font-extrabold">
          Every budgeting app has the <span className="gradient-text">same blind spots</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-white/50">
          We studied the market — the leaders, the veterans, the newcomers. Different
          logos, same gaps. Centavo was designed to close them.
        </p>
      </Reveal>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid gap-6 md:grid-cols-2"
      >
        {gaps.map((g) => (
          <motion.div key={g.problem} variants={fadeUp} className="glass card-lift rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-400/80" />
              <p className="text-sm leading-relaxed text-white/60">{g.problem}</p>
            </div>
            <div className="mt-4 flex items-start gap-3 border-t border-white/5 pt-4">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-mint-400" />
              <p className="text-sm font-semibold leading-relaxed">{g.answer}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
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
    price: "$10/mo",
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
      <Reveal>
        <h2 className="text-center text-4xl font-extrabold">Transparent pricing</h2>
        <p className="mt-4 text-center text-white/50">
          No “pay what you think is fair” games. No hidden cut of your savings.
        </p>
      </Reveal>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-12 grid gap-6 md:grid-cols-2"
      >
        {plans.map((p) => (
          <motion.div
            key={p.name}
            variants={fadeUp}
            className={`card-lift rounded-2xl p-8 ${p.featured ? "glow border border-mint-500/40 bg-mint-500/5" : "glass"}`}
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
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <Logo className="text-lg" iconClass="h-5 w-5" />
        <p className="max-w-md text-sm text-white/40">
          Every cent, accounted for. Demo project — not a real financial service.
        </p>
        <div className="flex items-center gap-2 text-xs text-white/30">
          <TrendingUp className="h-4 w-4" /> Built to out-budget them all.
        </div>
      </Reveal>
    </footer>
  );
}

export default function Landing() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Gaps />
      <Pricing />
      <Footer />
    </main>
  );
}
