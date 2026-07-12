export default function Card({ title, children, className = "" }) {
  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
        {title}
      </h3>
      {children}
    </div>
  );
}
