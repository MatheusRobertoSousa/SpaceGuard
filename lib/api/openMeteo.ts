import type { CurrentWeather, HourlyWeatherPoint, SearchLocation } from "@/types";

const geocodingBaseUrl = "https://geocoding-api.open-meteo.com/v1/search";
const forecastBaseUrl = "https://api.open-meteo.com/v1/forecast";

export async function searchCity(city: string): Promise<SearchLocation> {
  const url = `${geocodingBaseUrl}?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`;
  const response = await fetch(url, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error("Falha ao consultar a geolocalização da cidade.");
  }

  const data = (await response.json()) as {
    results?: Array<{
      name: string;
      latitude: number;
      longitude: number;
      country?: string;
      admin1?: string;
    }>;
  };

  const match = data.results?.[0];
  if (!match) {
    throw new Error("Nenhuma cidade encontrada com esse nome.");
  }

  return {
    city: match.name,
    latitude: match.latitude,
    longitude: match.longitude,
    country: match.country,
    admin1: match.admin1,
  };
}

export async function getForecast(location: SearchLocation): Promise<{
  current: CurrentWeather;
  hourly: HourlyWeatherPoint[];
}> {
  const url =
    `${forecastBaseUrl}?latitude=${location.latitude}&longitude=${location.longitude}` +
    "&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m" +
    "&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&timezone=auto&forecast_days=3";

  const response = await fetch(url, { next: { revalidate: 1800 } });
  if (!response.ok) {
    throw new Error("Falha ao consultar a previsão do Open-Meteo.");
  }

  const data = (await response.json()) as {
    current: {
      time: string;
      temperature_2m: number;
      relative_humidity_2m: number;
      precipitation: number;
      wind_speed_10m: number;
    };
    hourly: {
      time: string[];
      temperature_2m: number[];
      relative_humidity_2m: number[];
      precipitation: number[];
      wind_speed_10m: number[];
    };
  };

  const hourly = data.hourly.time.map((time, index) => ({
    time,
    temperature: data.hourly.temperature_2m[index],
    humidity: data.hourly.relative_humidity_2m[index],
    precipitation: data.hourly.precipitation[index],
    windSpeed: data.hourly.wind_speed_10m[index],
  }));

  return {
    current: {
      time: data.current.time,
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      precipitation: data.current.precipitation,
      windSpeed: data.current.wind_speed_10m,
    },
    hourly,
  };
}
