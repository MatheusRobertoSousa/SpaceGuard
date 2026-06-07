import type { NasaHistoryPoint, SearchLocation } from "@/types";

const nasaBaseUrl = "https://power.larc.nasa.gov/api/temporal/daily/point";

function getDateWindow() {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 9);

  const format = (value: Date) =>
    `${value.getFullYear()}${String(value.getMonth() + 1).padStart(2, "0")}${String(value.getDate()).padStart(2, "0")}`;

  return {
    start: format(start),
    end: format(end),
  };
}

export async function getNasaHistory(location: SearchLocation): Promise<NasaHistoryPoint[]> {
  const range = getDateWindow();
  const url =
    `${nasaBaseUrl}?parameters=T2M,RH2M,PRECTOTCORR,WS2M&community=RE&longitude=${location.longitude}` +
    `&latitude=${location.latitude}&start=${range.start}&end=${range.end}&format=JSON`;

  const response = await fetch(url, { next: { revalidate: 86400 } });
  if (!response.ok) {
    throw new Error("Falha ao consultar a NASA POWER.");
  }

  const data = (await response.json()) as {
    properties?: {
      parameter?: {
        T2M?: Record<string, number>;
        RH2M?: Record<string, number>;
        PRECTOTCORR?: Record<string, number>;
        WS2M?: Record<string, number>;
      };
    };
  };

  const parameters = data.properties?.parameter;
  if (!parameters?.T2M || !parameters.RH2M || !parameters.PRECTOTCORR || !parameters.WS2M) {
    throw new Error("Resposta incompleta da NASA POWER.");
  }

  return Object.keys(parameters.T2M).map((date) => ({
    date,
    temperature: parameters.T2M?.[date] ?? 0,
    humidity: parameters.RH2M?.[date] ?? 0,
    precipitation: parameters.PRECTOTCORR?.[date] ?? 0,
    windSpeed: parameters.WS2M?.[date] ?? 0,
  }));
}
