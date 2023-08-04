import { rest } from 'msw';
import Current from './Current.json';
import Forecast from './Forecast.json';
import Geo from './Geo.json';

const currentInvalidRequest = {
  cod: 400,
  message: 'Invalid request',
};

const forecastInvalidRequest = {
  cod: "400",
  message: 'Invalid request',
};

export const handlers = [
  rest.get(
    'https://api.openweathermap.org/data/2.5/weather',

    (req, res, ctx) => {
      if (
        req.url.searchParams.get('lat') === '43.0349931' &&
        req.url.searchParams.get('lon') === '-87.922497' &&
        req.url.searchParams.get('units') === 'imperial' &&
        req.url.searchParams.get('appid') === 'testAPIKey'
      ) {
        return res(
          ctx.status(200),

          ctx.json(Current),
        );
      } else {
        return res(
          ctx.status(400),

          ctx.json(currentInvalidRequest),
        );
      }
    },
  ),

  rest.get(
    'https://api.openweathermap.org/data/2.5/forecast',
    (req, res, ctx) => {
      if (
        req.url.searchParams.get('lat') === '43.0349931' &&
        req.url.searchParams.get('lon') === '-87.922497' &&
        req.url.searchParams.get('units') === 'imperial' &&
        req.url.searchParams.get('appid') === 'testAPIKey'
      ) {
        return res(
          ctx.status(200),

          ctx.json(Forecast),
        );
      } else {
        return res(
          ctx.status(400),

          ctx.json(forecastInvalidRequest),
        );
      }
    },
  ),

  rest.get(
    'http://api.openweathermap.org/geo/1.0/direct',
    (req, res, ctx) => {
      if (
        req.url.searchParams.get('q') === 'milwaukee' &&
        req.url.searchParams.get('limit') === '5' &&
        req.url.searchParams.get('appid') === 'testAPIKey'
      ) {
        return res(
          ctx.status(200),

          ctx.json(Geo),
        );
      } else {
        return res(
          ctx.status(400),

          ctx.json(forecastInvalidRequest),
        );
      }
    },
  ),
];
