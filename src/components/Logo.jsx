import { Coins } from "lucide-react";

export default function Logo({ className = "text-xl", iconClass = "h-6 w-6" }) {
  return (
    <span className={`flex items-center gap-2 font-extrabold ${className}`}>
      <Coins className={`${iconClass} text-mint-400`} /> Centavo
    </span>
  );
}
