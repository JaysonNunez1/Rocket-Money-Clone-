import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Each page pulls a heavy library (framer-motion, recharts, plaid-link),
// so lazy-loading keeps the initial bundle small.
const Landing = lazy(() => import("./pages/Landing.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Auth = lazy(() => import("./pages/Auth.jsx"));
const Accounts = lazy(() => import("./pages/Accounts.jsx"));

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center text-white/40">
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
