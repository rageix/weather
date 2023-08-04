import Controller from './Controller.tsx';
import Loading from '../../Components/Loading/Loading.tsx';
import { useEffect } from 'react';
import EmitStore, { emitterMessage } from '../../Stores/EmitStore.ts';
import SettingsStore from '../../Stores/SettingsStore.ts';
import { isBlank } from '../../Shared/Lib.ts';

const controller: Controller = new Controller();

export function HourlyWeather() {
  controller.onRender();
  const state = controller.state;

  useEffect(() => {
    EmitStore.emitter.on(
      emitterMessage.locationChanged,
      controller.loadLocation,
    );
    EmitStore.emitter.on(emitterMessage.reloadWeather, controller.onReload);

    if (!isBlank(SettingsStore.apiKey) && state.location && !state.hourly) {
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

  if (!state.hourly) {
    return null;
  }

  return (
    <div aria-label="hourly-weather"
         className="mt-4 rounded-lg bg-gradient-to-r from-sky-200 to-blue-200 p-4 mh-28">
      {state.loading && (
        <div className="rounded-md py-4 bg-blue-100 text-center">
          <Loading />
        </div>
      )}
      {!state.loading && state.hourly && (
        <div aria-label="hourly-weather-results">
          <div className="font-bold w-full leading-6 text-left text-gray-600">
            24 Hour Forecast
          </div>
          {state.hourly.list.slice(0, 8).map((v) => {
            return (
              <div
                key={v.dt}
                className="item mt-4 rounded-md p-2 bg-blue-100"
              >
                <div className="font-medium flex-shrink-0 leading-6 text-center text-gray-600">
                  {new Date(v.dt * 1000).toLocaleDateString('en-us', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <div className="flex items-center pt-2">
                  <div className="font-medium w-full leading-6 text-left text-gray-600">
                    <div>
                      {new Date(v.dt * 1000).toLocaleTimeString('en-us', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                  <div className="font-bold w-full text-center text-xl leading-6">
                    {Math.round(v.main.temp)}
                  </div>
                  <div className="font-medium w-full leading-6 flex justify-end text-gray-600">
                    <img
                      className="h-10"
                      src={`https://openweathermap.org/img/wn/${v.weather[0].icon}@2x.png`}
                      alt="Paris"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HourlyWeather;
