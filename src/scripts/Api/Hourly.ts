import SettingsStore from '../Stores/SettingsStore.ts';
import EmitStore from '../Stores/EmitStore.ts';
import { isBlank } from '../Shared/Lib.ts';

export interface HourlyResponse {
  cod: string;
  message: number;
  cnt: number;
  list: [
    {
      dt: number;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
      };
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        },
      ];
      clouds: {
        all: number;
      };
      wind: {
        speed: number;
        deg: number;
        gust: number;
      };
      visibility: number;
      pop: number;
      rain: {
        '1h': number;
      };
      sys: {
        pod: string;
      };
      dt_txt: string;
    },
  ];
  city: {
    id: string;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

/**
 * Gets the hourly weather forcast.
 * https://openweathermap.org/api/hourly-forecast
 * @return {Promise<CurrentResponse>}
 */
export async function getHourly(): Promise<HourlyResponse> {
  if (
    isBlank(SettingsStore.apiKey) ||
    isBlank(SettingsStore.unit) ||
    !location
  ) {
    EmitStore.emitShowSettings();
    throw 'Current application settings are invalid.';
  }

  const raw = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${SettingsStore.location.lat}&lon=${SettingsStore.location.lon}&units=${SettingsStore.unit}&lang=en&appid=${SettingsStore.apiKey}`,
  );

  const response = await raw.json();

  if (response?.cod !== '200') {
    throw response.message;
  }

  return response;
}
