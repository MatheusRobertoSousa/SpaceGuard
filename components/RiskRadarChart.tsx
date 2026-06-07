"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";

import { Card } from "@/components/ui/card";
import type { DisasterRisk } from "@/types";

export function RiskRadarChart({ risk }: { risk: DisasterRisk }) {
  const data = [
    { subject: "Enchente", value: risk.floodRisk },
    { subject: "Deslizamento", value: risk.landslideRisk },
    { subject: "Tempestade", value: risk.stormRisk },
    { subject: "Calor", value: risk.heatRisk },
    { subject: "Seca", value: risk.droughtRisk },
  ];

  return (
    <Card className="h-[320px]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-xl text-white">Mapa de risco</h3>
        <span className="text-sm text-slate-400">Pontuação 0-100</span>
      </div>
      <ResponsiveContainer width="100%" height="86%">
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.12)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "#e2e8f0", fontSize: 12 }} />
          <Radar dataKey="value" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.45} />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  );
}
