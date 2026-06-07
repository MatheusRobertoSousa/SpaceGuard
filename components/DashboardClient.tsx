"use client";

import { CloudRain, Droplets, Flame, Gauge, Satellite, TriangleAlert, Wind } from "lucide-react";
import { useState, useTransition } from "react";

import { AlertBadge } from "@/components/AlertBadge";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";
import { HistoryPanel } from "@/components/HistoryPanel";
import { LocationMap } from "@/components/LocationMap";
import { RiskCard } from "@/components/RiskCard";
import { RiskRadarChart } from "@/components/RiskRadarChart";
import { SearchForm } from "@/components/SearchForm";
import { WeatherChart } from "@/components/WeatherChart";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { listHistory, saveHistory } from "@/lib/storage";
import { formatDateTime } from "@/lib/utils";
import type { ClimateAnalysis, HistoryEntry } from "@/types";

interface AnalyzeResponse extends ClimateAnalysis {
  error?: string;
}

async function fetchAnalysis(params: { city?: string; latitude?: string; longitude?: string }) {
  const search = new URLSearchParams();
  if (params.city) {
    search.set("city", params.city);
  }
  if (params.latitude && params.longitude) {
    search.set("latitude", params.latitude);
    search.set("longitude", params.longitude);
  }

  const response = await fetch(`/api/analyze?${search.toString()}`);
  if (!response.ok) {
    throw new Error("Falha ao consultar a análise climática.");
  }

  return (await response.json()) as AnalyzeResponse;
}

export function DashboardClient() {
  const [analysis, setAnalysis] = useState<AnalyzeResponse | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>(() => listHistory());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleAnalyze = (values: { city?: string; latitude?: string; longitude?: string }) => {
    setErrorMessage(null);

    startTransition(async () => {
      try {
        const result = await fetchAnalysis(values);
        setAnalysis(result);
        if (result.error) {
          setErrorMessage(result.error);
        }

        const historyEntry: HistoryEntry = {
          id: `${result.location.city}-${result.generatedAt}`,
          city: result.location.city,
          latitude: result.location.latitude,
          longitude: result.location.longitude,
          overallScore: result.risk.overallScore,
          level: result.risk.level,
          createdAt: result.generatedAt,
        };

        saveHistory(historyEntry);
        setHistory(listHistory());
        setSelectedCoordinates({
          latitude: result.location.latitude,
          longitude: result.location.longitude,
        });
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Não foi possível realizar a análise.");
      }
    });
  };

  const handleHistorySelect = (entry: HistoryEntry) => {
    handleAnalyze({
      city: entry.city !== "Coordenadas informadas" ? entry.city : undefined,
      latitude: String(entry.latitude),
      longitude: String(entry.longitude),
    });
  };

  const mapLocation = {
    city: analysis?.location.city ?? "Área de seleção",
    latitude: selectedCoordinates?.latitude ?? analysis?.location.latitude ?? -23.55052,
    longitude: selectedCoordinates?.longitude ?? analysis?.location.longitude ?? -46.63331,
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div>
            <Badge className="border-cyan-400/20 bg-cyan-400/10 text-cyan-200">Painel operacional</Badge>
            <h1 className="mt-4 font-display text-4xl text-white">Análise espacial e climática em tempo quase real</h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Pesquise uma cidade ou informe coordenadas para combinar dados da Open-Meteo e NASA POWER em um
              indicador de risco claro, visual e pronto para ação.
            </p>
          </div>
          <SearchForm
            onSubmit={handleAnalyze}
            loading={isPending}
            initialValues={{ city: "São Paulo" }}
            selectedCoordinates={selectedCoordinates}
          />
          {errorMessage ? (
            <Card className="border-amber-400/20 bg-amber-400/10 text-amber-50">
              <p className="text-sm leading-6">{errorMessage}</p>
            </Card>
          ) : null}
        </div>
        <Card className="relative overflow-hidden">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="relative">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-3">
                <Satellite className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Modo de monitoramento</p>
                <p className="font-semibold text-white">{analysis?.sourceMode === "fallback" ? "Contingência" : "Operacional"}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
                <p className="text-sm text-slate-400">Última geração</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {analysis ? formatDateTime(analysis.generatedAt) : "Aguardando análise"}
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
                <p className="text-sm text-slate-400">Nível de alerta</p>
                <div className="mt-3">{analysis ? <AlertBadge level={analysis.risk.level} /> : <AlertBadge level="BAIXO" />}</div>
              </div>
              <p className="text-sm leading-6 text-slate-300">
                Arquitetura preparada para PostgreSQL via camada de repositório. Nesta versão, o histórico do usuário
                é salvo com `localStorage` para simplificar a demonstração.
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <LocationMap location={mapLocation} onLocationSelect={setSelectedCoordinates} />
        <Card>
          <h2 className="font-display text-2xl text-white">Escolha a localização pelo mapa</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Clique no mapa para preencher latitude e longitude automaticamente no formulário. Isso ajuda quando você
            quer analisar um ponto específico sem depender do nome da cidade.
          </p>
          <div className="mt-6 rounded-3xl border border-cyan-400/15 bg-cyan-400/8 p-4 text-sm text-cyan-100">
            {selectedCoordinates
              ? `Ponto selecionado: ${selectedCoordinates.latitude.toFixed(5)}, ${selectedCoordinates.longitude.toFixed(5)}`
              : "Nenhum ponto selecionado ainda. Clique em qualquer região do mapa para definir as coordenadas."}
          </div>
          <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
            Dica: depois de clicar no mapa, use o botão “Analisar local” para buscar os dados climáticos desse ponto.
          </div>
        </Card>
      </section>

      {isPending ? <DashboardSkeleton /> : null}

      {analysis ? (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <RiskCard
              title="Temperatura atual"
              value={analysis.current.temperature}
              unit="°C"
              description="Leitura atual de temperatura da região monitorada."
              icon={Flame}
            />
            <RiskCard
              title="Precipitação"
              value={analysis.current.precipitation}
              unit="mm"
              description="Chuva registrada no horário atual e projeção nas próximas horas."
              icon={CloudRain}
            />
            <RiskCard
              title="Velocidade do vento"
              value={analysis.current.windSpeed}
              unit="km/h"
              description="Rajadas mais fortes elevam o risco de tempestades severas."
              icon={Wind}
            />
            <RiskCard
              title="Umidade"
              value={analysis.current.humidity}
              unit="%"
              description="Baixa umidade intensifica desconforto térmico e seca."
              icon={Droplets}
            />
            <RiskCard
              title="Índice geral"
              value={analysis.risk.overallScore}
              unit="/100"
              description="Pontuação ponderada a partir de enchente, deslizamento, tempestade, calor e seca."
              icon={Gauge}
              highlight
            />
            <RiskCard
              title="Nível de alerta"
              value={analysis.risk.level === "CRITICO" ? 4 : analysis.risk.level === "ALTO" ? 3 : analysis.risk.level === "MODERADO" ? 2 : 1}
              unit="/4"
              description={`Classificação atual: ${analysis.risk.level}. Use junto das recomendações preventivas abaixo.`}
              icon={TriangleAlert}
            />
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <WeatherChart title="Temperatura por hora" color="#fb7185" data={analysis.hourly} dataKey="temperature" unit="°C" />
            <WeatherChart
              title="Precipitação por hora"
              color="#38bdf8"
              data={analysis.hourly}
              dataKey="precipitation"
              unit="mm"
              type="area"
            />
            <WeatherChart title="Velocidade do vento" color="#c084fc" data={analysis.hourly} dataKey="windSpeed" unit="km/h" />
            <RiskRadarChart risk={analysis.risk} />
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <LocationMap location={analysis.location} onLocationSelect={setSelectedCoordinates} />
            <Card>
              <h3 className="font-display text-2xl text-white">Recomendações automáticas</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Orientações geradas com base nos fatores climáticos atuais e no histórico recente da NASA POWER.
              </p>
              <div className="mt-6 space-y-3">
                {analysis.risk.recommendations.map((recommendation) => (
                  <div key={recommendation} className="rounded-3xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-200">
                    {recommendation}
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-3xl border border-cyan-400/15 bg-cyan-400/8 p-4 text-sm text-cyan-100">
                Local analisado: {analysis.location.city} ({analysis.location.latitude.toFixed(2)},{" "}
                {analysis.location.longitude.toFixed(2)})
              </div>
            </Card>
          </section>
        </>
      ) : null}

      <HistoryPanel history={history} onSelect={handleHistorySelect} />
    </div>
  );
}
