import { NextResponse } from "next/server";

import { getNasaHistory } from "@/lib/api/nasaPower";
import { getForecast, searchCity } from "@/lib/api/openMeteo";
import { calculateDisasterRisk } from "@/lib/risk/calculateDisasterRisk";
import type { ClimateAnalysis, SearchLocation } from "@/types";

function buildFallbackAnalysis(location: SearchLocation): ClimateAnalysis {
  const now = new Date();
  const hourly = Array.from({ length: 24 }, (_, index) => {
    const pointDate = new Date(now.getTime() + index * 60 * 60 * 1000);
    return {
      time: pointDate.toISOString(),
      temperature: 26 + Math.sin(index / 3) * 5,
      humidity: 65 - index * 0.6,
      precipitation: index % 6 === 0 ? 7 : index % 5 === 0 ? 3 : 0,
      windSpeed: 16 + index * 0.5,
    };
  });

  const nasaHistory = Array.from({ length: 10 }, (_, index) => ({
    date: new Date(now.getTime() - (9 - index) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    temperature: 24 + index * 0.4,
    humidity: 72 - index,
    precipitation: index % 3 === 0 ? 6 : 1.2,
    windSpeed: 11 + index * 0.3,
  }));

  const current = {
    time: now.toISOString(),
    temperature: hourly[0].temperature,
    humidity: hourly[0].humidity,
    precipitation: hourly[0].precipitation,
    windSpeed: hourly[0].windSpeed,
  };

  return {
    location,
    current,
    hourly,
    nasaHistory,
    risk: calculateDisasterRisk({ current, hourly, nasaHistory }),
    sourceMode: "fallback",
    generatedAt: now.toISOString(),
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  try {
    let location: SearchLocation;

    if (city) {
      location = await searchCity(city);
    } else if (latitude && longitude) {
      location = {
        city: "Coordenadas informadas",
        latitude: Number(latitude),
        longitude: Number(longitude),
      };
    } else {
      return NextResponse.json({ error: "Informe uma cidade ou coordenadas válidas." }, { status: 400 });
    }

    const [forecast, nasaHistory] = await Promise.all([getForecast(location), getNasaHistory(location)]);

    const analysis: ClimateAnalysis = {
      location,
      current: forecast.current,
      hourly: forecast.hourly,
      nasaHistory,
      risk: calculateDisasterRisk({
        current: forecast.current,
        hourly: forecast.hourly,
        nasaHistory,
      }),
      sourceMode: "live",
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json(analysis);
  } catch (error) {
    const fallbackLocation: SearchLocation = {
      city: city ?? "Área monitorada",
      latitude: Number(latitude ?? -23.55),
      longitude: Number(longitude ?? -46.63),
      country: "Brasil",
    };

    const fallback = buildFallbackAnalysis(fallbackLocation);

    return NextResponse.json(
      {
        ...fallback,
        error:
          error instanceof Error
            ? `${error.message} Exibindo dados de referência temporários para manter a visualização disponível.`
            : "Falha inesperada. Exibindo dados de referência temporários para manter a visualização disponível.",
      },
      { status: 200 },
    );
  }
}
