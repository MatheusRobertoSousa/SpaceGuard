"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";

import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import type { HourlyWeatherPoint } from "@/types";

interface WeatherChartProps {
  title: string;
  color: string;
  data: HourlyWeatherPoint[];
  dataKey: "temperature" | "precipitation" | "windSpeed";
  unit: string;
  type?: "line" | "area";
}

export function WeatherChart({ title, color, data, dataKey, unit, type = "line" }: WeatherChartProps) {
  const chartData = data.slice(0, 24).map((point) => ({
    ...point,
    label: new Intl.DateTimeFormat("pt-BR", { hour: "2-digit" }).format(new Date(point.time)),
  }));

  return (
    <Card className="h-[320px]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-xl text-white">{title}</h3>
        <span className="text-sm text-slate-400">Próximas 24 horas</span>
      </div>
      <ResponsiveContainer width="100%" height="86%">
        {type === "area" ? (
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`${dataKey}-gradient`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.5} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "#cbd5e1", fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ background: "#071123", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16 }}
              formatter={(value) => `${formatNumber(Number(value ?? 0))} ${unit}`}
            />
            <Area type="monotone" dataKey={dataKey} stroke={color} fill={`url(#${dataKey}-gradient)`} strokeWidth={3} />
          </AreaChart>
        ) : (
          <LineChart data={chartData}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "#cbd5e1", fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ background: "#071123", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16 }}
              formatter={(value) => `${formatNumber(Number(value ?? 0))} ${unit}`}
            />
            <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} dot={false} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
}
