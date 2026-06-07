import { AlertTriangle, ShieldAlert, Siren, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { RiskLevel } from "@/types";

const styles: Record<RiskLevel, string> = {
  BAIXO: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  MODERADO: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  ALTO: "border-orange-400/30 bg-orange-400/10 text-orange-100",
  CRITICO: "border-rose-500/30 bg-rose-500/10 text-rose-100",
};

const icons: Record<RiskLevel, typeof Sparkles> = {
  BAIXO: Sparkles,
  MODERADO: AlertTriangle,
  ALTO: ShieldAlert,
  CRITICO: Siren,
};

export function AlertBadge({ level }: { level: RiskLevel }) {
  const Icon = icons[level];

  return (
    <Badge className={styles[level]}>
      <Icon className="mr-2 h-3.5 w-3.5" />
      {level}
    </Badge>
  );
}
