# Centavo — Every cent, accounted for

A budgeting platform built to close the gaps every other budgeting app leaves open. Website now, mobile app later.

## Why Centavo wins

| Gap in today's budgeting apps | Centavo's answer |
|---|---|
| Free tiers cap categories or force manual entry | Unlimited categories + auto-sync, free forever |
| Bill-negotiation services take 35–60% of your savings | Free DIY negotiation scripts — keep 100% |
| Charts show *what* you spent, not *why* | Plain-English AI insights with a concrete fix attached |
| No forward view of your money | Cash-flow forecast calendar with low-balance warnings |
| No real couples mode (or Apple-only apps) | Shared budgets with per-person views, on any device |
| Slow, email-only customer support | Priority human support on Plus |

## Tech stack

- React 18 + Vite 6, Tailwind CSS v4, React Router, Recharts, lucide-react
- Express API with JWT auth (bcrypt-hashed passwords)
- Plaid for real bank connections (sandbox-ready)

## Run locally

```bash
npm install
npm run dev:all
```

This starts the website (http://localhost:5173) and the API (http://localhost:4000) together. `npm run dev` runs just the website.

## Enable real bank connections (Plaid sandbox — free)

1. Create a free account at https://dashboard.plaid.com
2. Copy `.env.example` to `.env` and fill in `PLAID_CLIENT_ID` and `PLAID_SECRET` (Team Settings → Keys), keep `PLAID_ENV=sandbox`
3. Restart with `npm run dev:all`, sign up, go to My Accounts → Connect a bank
4. In the sandbox bank login, use username `user_good` and password `pass_good`

Without Plaid keys, accounts/auth still work — only bank linking is disabled.

## Pages

- `/` — marketing landing page (features, what other apps miss, pricing)
- `/#/app` — interactive demo dashboard with sample data (insights, cash-flow forecast, budgets, subscriptions, goals)
- `/#/login` — sign up / log in
- `/#/accounts` — connect banks via Plaid, view balances and last-30-day transactions

## Roadmap

- Wire dashboard charts to real Plaid transactions
- Savings autopilot & round-ups
- Debt payoff planner (snowball / avalanche)
- React Native mobile app

> Demo project — not a real financial service.
