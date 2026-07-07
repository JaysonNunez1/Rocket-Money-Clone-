export const spendingByMonth = [
  { month: "Jan", spent: 3120, income: 4800 },
  { month: "Feb", spent: 2890, income: 4800 },
  { month: "Mar", spent: 3410, income: 5100 },
  { month: "Apr", spent: 2980, income: 4800 },
  { month: "May", spent: 3260, income: 4800 },
  { month: "Jun", spent: 2740, income: 5250 },
];

export const categories = [
  { name: "Housing", budget: 1500, spent: 1500, color: "#34d399" },
  { name: "Groceries", budget: 500, spent: 412, color: "#6ee7b7" },
  { name: "Dining Out", budget: 250, spent: 291, color: "#fbbf24" },
  { name: "Transport", budget: 300, spent: 187, color: "#38bdf8" },
  { name: "Entertainment", budget: 150, spent: 96, color: "#a78bfa" },
  { name: "Shopping", budget: 200, spent: 254, color: "#fb7185" },
];

export const subscriptions = [
  { name: "Netflix", price: 15.49, cycle: "monthly", next: "Jul 12", hike: true, oldPrice: 13.99 },
  { name: "Spotify", price: 11.99, cycle: "monthly", next: "Jul 15", hike: false },
  { name: "Planet Fitness", price: 24.99, cycle: "monthly", next: "Jul 18", hike: false },
  { name: "iCloud+", price: 2.99, cycle: "monthly", next: "Jul 21", hike: false },
  { name: "Adobe CC", price: 59.99, cycle: "monthly", next: "Jul 28", hike: true, oldPrice: 54.99 },
];

export const cashFlowForecast = [
  { day: "Jul 6", balance: 2340 },
  { day: "Jul 10", balance: 2120 },
  { day: "Jul 15", balance: 1480 },
  { day: "Jul 18", balance: 690 },
  { day: "Jul 21", balance: 410 },
  { day: "Jul 25", balance: 2960 },
  { day: "Jul 31", balance: 2610 },
];

export const goals = [
  { name: "Emergency Fund", target: 10000, saved: 6400 },
  { name: "Trip to Japan", target: 3500, saved: 1275 },
  { name: "New Laptop", target: 1800, saved: 1620 },
];

export const insights = [
  {
    title: "Dining out is up 34% vs your 3-month average",
    body: "Mostly weekend delivery orders (6 DoorDash charges, $118 total). Cooking 2 of those meals would put this category back under budget.",
    tone: "warn",
  },
  {
    title: "Heads up: projected low balance of $410 on Jul 21",
    body: "Rent clears Jul 18 and Adobe renews Jul 28. Moving $200 from savings before Jul 18 keeps your buffer above $600.",
    tone: "alert",
  },
  {
    title: "Netflix raised your price — again",
    body: "You're paying $15.49, up from $13.99. Here's a proven script to get the promo rate back, or cancel in one tap.",
    tone: "info",
  },
];
