export default function ProgressBar({ pct, color = "#10b981" }) {
  return (
    <div className="mt-1.5 h-2 rounded-full bg-white/5">
      <div
        className="h-2 rounded-full"
        style={{ width: `${Math.min(100, pct)}%`, background: color }}
      />
    </div>
  );
}
