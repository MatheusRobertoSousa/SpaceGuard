import type { CurrentWeather, DisasterRisk, HourlyWeatherPoint, NasaHistoryPoint, RiskLevel } from "@/types";
import { clamp } from "@/lib/utils";

interface RiskInput {
  current: CurrentWeather;
  hourly: HourlyWeatherPoint[];
  nasaHistory: NasaHistoryPoint[];
}

function getRiskLevel(score: number): RiskLevel {
  if (score >= 75) {
    return "CRITICO";
  }
  if (score >= 55) {
    return "ALTO";
  }
  if (score >= 30) {
    return "MODERADO";
  }
  return "BAIXO";
}

export function calculateDisasterRisk({ current, hourly, nasaHistory }: RiskInput): DisasterRisk {
  const next24h = hourly.slice(0, 24);
  const totalRain = next24h.reduce((acc, point) => acc + point.precipitation, 0);
  const peakWind = Math.max(current.windSpeed, ...next24h.map((point) => point.windSpeed));
  const peakTemp = Math.max(current.temperature, ...next24h.map((point) => point.temperature));
  const minHumidity = Math.min(current.humidity, ...next24h.map((point) => point.humidity));

  const recentRain = nasaHistory.slice(-7).reduce((acc, point) => acc + point.precipitation, 0);
  const avgRecentHumidity =
    nasaHistory.length > 0
      ? nasaHistory.reduce((acc, point) => acc + point.humidity, 0) / nasaHistory.length
      : current.humidity;

  const floodRisk = clamp(totalRain * 1.8 + current.precipitation * 8 + (current.humidity > 85 ? 10 : 0));
  const landslideRisk = clamp(totalRain * 1.4 + (totalRain > 50 ? 25 : 0) + (avgRecentHumidity > 80 ? 12 : 0));
  const stormRisk = clamp((peakWind - 20) * 1.9 + totalRain * 0.6);
  const heatRisk = clamp((peakTemp - 26) * 5 + (minHumidity < 35 ? 12 : 0));
  const droughtRisk = clamp((35 - minHumidity) * 2 + (recentRain < 12 ? 28 : 0) + (peakTemp > 32 ? 12 : 0));

  const overallScore = Math.round(
    floodRisk * 0.24 +
      landslideRisk * 0.22 +
      stormRisk * 0.2 +
      heatRisk * 0.18 +
      droughtRisk * 0.16,
  );

  const recommendations = new Set<string>();

  if (floodRisk >= 45) {
    recommendations.add("Monitore córregos, bueiros e regiões com histórico de alagamento.");
  }
  if (landslideRisk >= 45) {
    recommendations.add("Evite áreas de encosta nas próximas horas e acompanhe avisos da Defesa Civil.");
  }
  if (stormRisk >= 45) {
    recommendations.add("Proteja objetos soltos e evite deslocamentos durante rajadas mais intensas.");
  }
  if (heatRisk >= 45) {
    recommendations.add("Evite exposição prolongada ao sol e reforce a hidratação.");
  }
  if (droughtRisk >= 45) {
    recommendations.add("Mantenha reserva de água e reduza atividades que aumentem o consumo hídrico.");
  }
  if (recommendations.size === 0) {
    recommendations.add("Condições estáveis no momento. Continue monitorando a previsão para mudanças rápidas.");
  }

  return {
    overallScore,
    level: getRiskLevel(overallScore),
    floodRisk: Math.round(floodRisk),
    landslideRisk: Math.round(landslideRisk),
    stormRisk: Math.round(stormRisk),
    heatRisk: Math.round(heatRisk),
    droughtRisk: Math.round(droughtRisk),
    recommendations: Array.from(recommendations),
  };
}
