"use client";

import { Clock3, MapPinned } from "lucide-react";

import { AlertBadge } from "@/components/AlertBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import type { HistoryEntry } from "@/types";

interface HistoryPanelProps {
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
}

export function HistoryPanel({ history, onSelect }: HistoryPanelProps) {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl text-white">Últimas análises</h3>
          <p className="text-sm text-slate-400">Histórico salvo localmente e pronto para migração futura ao PostgreSQL.</p>
        </div>
      </div>

      <div className="space-y-3">
        {history.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 p-5 text-sm text-slate-400">
            Nenhuma análise salva ainda. Faça a primeira consulta para preencher este painel.
          </div>
        ) : null}

        {history.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => onSelect(entry)}
            className="w-full rounded-3xl border border-white/10 bg-slate-950/40 p-4 text-left transition hover:border-primary/30 hover:bg-slate-950/70"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-white">{entry.city}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {formatDateTime(entry.createdAt)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPinned className="h-3.5 w-3.5" />
                    {entry.latitude.toFixed(2)}, {entry.longitude.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-primary">{entry.overallScore}/100</span>
                <AlertBadge level={entry.level} />
              </div>
            </div>
          </button>
        ))}
      </div>

      {history.length > 0 ? (
        <div className="mt-5">
          <Button variant="ghost" className="px-0 text-slate-300">
            Persistência local ativa
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
