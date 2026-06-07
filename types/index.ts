export type RiskLevel = "BAIXO" | "MODERADO" | "ALTO" | "CRITICO";

export interface DisasterRisk {
  overallScore: number;
  level: RiskLevel;
  floodRisk: number;
  landslideRisk: number;
  stormRisk: number;
  heatRisk: number;
  droughtRisk: number;
  recommendations: string[];
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface SearchLocation extends Coordinates {
  city: string;
  country?: string;
  admin1?: string;
}

export interface CurrentWeather {
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  time: string;
}

export interface HourlyWeatherPoint {
  time: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
}

export interface NasaHistoryPoint {
  date: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
}

export interface ClimateAnalysis {
  location: SearchLocation;
  current: CurrentWeather;
  hourly: HourlyWeatherPoint[];
  nasaHistory: NasaHistoryPoint[];
  risk: DisasterRisk;
  sourceMode: "live" | "fallback";
  generatedAt: string;
}

export interface HistoryEntry {
  id: string;
  city: string;
  latitude: number;
  longitude: number;
  overallScore: number;
  level: RiskLevel;
  createdAt: string;
}
