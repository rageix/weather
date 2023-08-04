import SettingsStore from '../Stores/SettingsStore.ts';
import EmitStore from '../Stores/EmitStore.ts';
import { isBlank } from '../Shared/Lib.ts';

export interface CurrentResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    '1h': number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

/**
 * Gets the current weather.
 * https://openweathermap.org/current
 * @param lat - Geographical coordinates
 * @param lon - Geographical coordinates
 * @return {Promise<CurrentResponse>}
 */
export async function getCurrent(): Promise<CurrentResponse> {
  if (
    isBlank(SettingsStore.apiKey) ||
    isBlank(SettingsStore.unit) ||
    !location
  ) {
    EmitStore.emitShowSettings();
    throw 'Current application settings are invalid.';
  }

  const raw = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${SettingsStore.location.lat}&lon=${SettingsStore.location.lon}&units=${SettingsStore.unit}&lang=en&appid=${SettingsStore.apiKey}`,
  );

  const response = await raw.json();

  if (response?.cod !== 200) {
    throw response.message;
  }

  return response;
}
