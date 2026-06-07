import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn, formatNumber } from "@/lib/utils";

interface RiskCardProps {
  title: string;
  value: number;
  unit?: string;
  description: string;
  icon: LucideIcon;
  highlight?: boolean;
}

export function RiskCard({ title, value, unit, description, icon: Icon, highlight }: RiskCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", highlight && "border-primary/30 bg-cyan-400/10")}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-300">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {formatNumber(value)}
            {unit ? <span className="ml-1 text-sm text-slate-300">{unit}</span> : null}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      <p className="text-sm leading-6 text-slate-300">{description}</p>
    </Card>
  );
}
