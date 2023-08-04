import Controller from './Controller.tsx';
import Loading from '../../Components/Loading/Loading.tsx';
import { useEffect } from 'react';
import EmitStore, { emitterMessage } from '../../Stores/EmitStore.ts';
import SettingsStore from '../../Stores/SettingsStore.ts';
import { degreesToDirection, isBlank } from '../../Shared/Lib.ts';

const controller: Controller = new Controller();

export function CurrentWeather() {
  controller.onRender();
  const state = controller.state;

  useEffect(() => {
    EmitStore.emitter.on(
      emitterMessage.locationChanged,
      controller.loadLocation,
    );
    EmitStore.emitter.on(emitterMessage.reloadWeather, controller.onReload);

    if (!isBlank(SettingsStore.apiKey) && state.location && !state.current) {
      controller.loadLocation().catch();
    }

    return () => {
      EmitStore.emitter.off(
        emitterMessage.locationChanged,
        controller.loadLocation,
      );
      EmitStore.emitter.off(emitterMessage.reloadWeather, controller.onReload);
    };
  }, []);

  return (
    <div
      aria-label="current-weather"
      className="mt-4 rounded-lg bg-gradient-to-r from-sky-200 to-blue-200 p-4 mh-28"
    >
      {state.loading && (
        <div
          aria-label="current-weather-loading"
          className="rounded-md py-4 bg-blue-100 text-center"
        >
          <Loading />
        </div>
      )}
      {!state.loading && !state.current && (
        <div
          aria-label="current-weather-nothing"
          className="nothing-to-display relative block w-full rounded-md p-4 bg-blue-100 text-center"
        >
          <span className="block text-sm font-semibold text-gray-900">
            Nothing to display.
            <br />
            Enter something into the search above.
          </span>
        </div>
      )}
      {!state.loading && state.current && (
        <div aria-label="current-weather-results">
          <div className="font-bold w-full leading-6 text-left text-gray-600">
            Current Weather
          </div>
          <div className="rounded-md mt-4 py-4 bg-blue-100">
            <div
              id="currentName"
              className="font-light text-3xl leading-6 text-center text-gray-900"
            >
              {state.current.name}
            </div>
            <div
              id="currentDate"
              className="font-light mt-2 text-sm leading-6 text-center text-gray-900"
            >
              {new Date(state.current.dt * 1000).toLocaleTimeString('en-us', {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            <div
              id="currentTemp"
              className="mt-2 text-center text-7xl"
            >
              {Math.round(state.current.main.temp)}
            </div>
            <div
              id="currentWeatherMain"
              className="mt-2"
            >
              <div className="text-center text-2xl font-medium leading-6 text-gray-900">
                {state.current.weather[0].main}
              </div>
            </div>
          </div>
          <div className="columns-3 mt-4 rounded-md py-2 bg-blue-100">
            <div className="text-center">
              <div
                id="currentFeels"
                className="font-medium leading-6 text-gray-600"
              >
                Feels
              </div>
              <div>{Math.round(state.current.main.feels_like)}</div>
            </div>
            <div
              id="currentLow"
              className="text-center"
            >
              <div className="font-medium leading-6 text-gray-600">Low</div>
              <div>{Math.round(state.current.main.temp_min)}</div>
            </div>
            <div
              id="currentHigh"
              className="text-center"
            >
              <div className="font-medium leading-6 text-gray-600">High</div>
              <div>{Math.round(state.current.main.temp_max)}</div>
            </div>
          </div>
          <div
            id="currentWind"
            className="columns-2 mt-4 rounded-md py-2 bg-blue-100"
          >
            <div className="text-center">
              <div className="font-medium leading-6 text-gray-600">Wind</div>
              <div>
                {degreesToDirection(state.current.wind.deg)}{' '}
                {Math.round(state.current.wind.speed)}
              </div>
            </div>
            <div
              id="currentHumiddity"
              className="text-center"
            >
              <div className="font-medium leading-6 text-gray-600">
                Humidity
              </div>
              <div>{Math.round(state.current.main.humidity)}</div>
            </div>
          </div>
          <div
            id="currentSunrise"
            className="columns-2 mt-4 rounded-md py-2 bg-blue-100"
          >
            <div className="text-center">
              <div className="font-medium leading-6 text-gray-600">Sunrise</div>
              <div>
                {new Date(state.current.sys.sunrise * 1000).toLocaleTimeString(
                  'en-us',
                  {
                    hour: 'numeric',
                    minute: '2-digit',
                  },
                )}
              </div>
            </div>
            <div className="text-center">
              <div
                id="currentSunset"
                className="font-medium leading-6 text-gray-600"
              >
                Sunset
              </div>
              <div>
                {new Date(state.current.sys.sunset * 1000).toLocaleTimeString(
                  'en-us',
                  {
                    hour: 'numeric',
                    minute: '2-digit',
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;
