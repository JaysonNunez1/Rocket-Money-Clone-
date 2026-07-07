# Centavo — Every cent, accounted for

A budgeting platform built to beat Rocket Money at its own game. Website now, mobile app later.

## Why Centavo wins vs Rocket Money

| Gap in Rocket Money | Centavo's answer |
|---|---|
| Free plan capped at 2 custom budget categories | Unlimited categories, free forever |
| Bill negotiation takes 35–60% of your savings | Free DIY negotiation scripts — keep 100% |
| Charts show *what* you spent, not *why* | Plain-English AI insights with a concrete fix attached |
| No forward view of your money | Cash-flow forecast calendar with low-balance warnings |
| No real couples mode | Shared budgets with per-person views |
| Silent subscription price hikes | Price-hike radar alerts the moment a price changes |
| Email-only support, 21% BBB resolution rate | Priority human support on Plus |

## Tech stack

- React 18 + Vite 6
- Tailwind CSS v4
- React Router (landing page + demo dashboard)
- Recharts (charts)
- lucide-react (icons)

## Run locally

```bash
npm install
npm run dev
```

Then open the printed localhost URL. `npm run build` produces the production bundle in `dist/`.

## Pages

- `/` — marketing landing page (features, comparison vs Rocket Money, pricing)
- `/#/app` — interactive demo dashboard with sample data (insights, cash-flow forecast, budgets, subscriptions, goals)

## Roadmap

- Real bank connections (Plaid)
- Auth + user accounts
- Savings autopilot & round-ups
- Debt payoff planner (snowball / avalanche)
- React Native mobile app

> Demo project — not a real financial service.
