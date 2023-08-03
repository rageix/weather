import AppIdStore from "../Stores/ApiKeyStore.ts";
export interface CurrentResponse {
  "coord": {
    "lon": number,
    "lat": number
  },
  "weather": [
    {
      "id": number,
      "main": string,
      "description": string,
      "icon": string
    }
  ],
  "base": string,
  "main": {
    "temp": number,
    "feels_like": number,
    "temp_min": number,
    "temp_max": number,
    "pressure": number,
    "humidity": number,
    "sea_level": number,
    "grnd_level": number
  },
  "visibility": number,
  "wind": {
    "speed": number,
    "deg": number,
    "gust": number
  },
  "rain": {
    "1h": number
  },
  "clouds": {
    "all": number
  },
  "dt": number,
  "sys": {
    "type": number,
    "id": number,
    "country": string,
    "sunrise": number,
    "sunset": number
  },
  "timezone": number,
  "id": number,
  "name": string,
  "cod": number
}

export type Unit = 'standard' | 'metric' | 'imperial';

/**
 * Gets the current weather.
 * https://openweathermap.org/current
 * @param lat - Geographical coordinates
 * @param lon - Geographical coordinates
 * @param units - Units of measurement
 * @return {Promise<CurrentResponse>}
 */
export async function getCurrent(
  lat: number,
  lon: number,
  units: Unit
): Promise<CurrentResponse> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=en&appid=${AppIdStore.apiKey}`,
  );

  return await response.json();
}
