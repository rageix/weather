import Controller from './Controller.tsx';
import SearchBox from '../../Components/SearchBox/SearchBox.tsx';
import Notifications from '../../Components/Notifications/Notifications.tsx';
import Loading from '../../Components/Loading/Loading.tsx';
import { Cog6ToothIcon } from '@heroicons/react/20/solid';
import { UnitOption } from '../../Components/Units/Units.tsx';

export const unitOptions: UnitOption[] = [
  { value: 'imperial', label: '℉' },
  { value: 'metric', label: '°C' },
  { value: 'standard', label: 'K' },
];

const controller: Controller = new Controller();

export function Component() {
  controller.onRender();
  const state = controller.state;

  return (
    <div className="container h-screen mx-auto max-w-md p-4 bg-gradient-to-r from-sky-400 to-blue-600">
      <div className="flex items-start items-center">
        <div className="flex-1">
          <SearchBox
            selected={state.location}
            onChange={controller.onChangeLocation}
          />
        </div>
        <div className="flex-shrink-0 ml-2">
          <Cog6ToothIcon
            className="h-9 text-gray-200 hover:text-gray-300 cursor-pointer"
            aria-hidden="true"
            onClick={controller.onClickSettings}
          />
        </div>
      </div>
      {state.showSettings && (
        <div className="mt-4 rounded-lg bg-gradient-to-r from-sky-200 to-blue-200 p-4 mh-28">
          <div className="rounded-md p-4 bg-blue-100">
            <div>
              <label className="text-base font-semibold text-gray-900">
                Units
              </label>
              <p className="text-sm text-gray-500">
                What units would you like to use?
              </p>
              <fieldset className="mt-4">
                <legend className="sr-only">Units</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  {unitOptions.map((option: UnitOption) => (
                    <div
                      key={option.value}
                      className="flex items-center"
                    >
                      <input
                        id={option.value}
                        name="notification-method"
                        type="radio"
                        checked={state.units.value === option.value}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-sky-400"
                        onChange={() => controller.onChangeUnits(option)}
                      />
                      <label
                        htmlFor={option.value}
                        className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 rounded-lg bg-gradient-to-r from-sky-200 to-blue-200 p-4 mh-28">
        {state.loading && (
          <div className="rounded-md py-4 bg-blue-100 text-center">
            <Loading />
          </div>
        )}
        {!state.loading && !state.current && (
          <div className="relative block w-full rounded-md p-4 bg-blue-100 text-center">
            <span className="block text-sm font-semibold text-gray-900">
              Nothing to display.
              <br />
              Enter something into the search above.
            </span>
          </div>
        )}
        {!state.loading && state.current && (
          <>
            <div className="rounded-md py-4 bg-blue-100">
              <div className="font-light text-3xl leading-6 text-center text-gray-900">
                {state.current.name}
              </div>
              <div className="mt-2 text-center text-7xl">
                {Math.round(state.current.main.temp)}
              </div>
              <div className="mt-2">
                <div className="text-center text-2xl font-medium leading-6 text-gray-900">
                  {state.current.weather[0].main}
                </div>
              </div>
            </div>
            <div className="columns-3 mt-4 rounded-md py-2 bg-blue-100">
              <div className="text-center">
                <div className="font-medium leading-6 text-gray-600">Feels</div>
                <div>{Math.round(state.current.main.feels_like)}</div>
              </div>
              <div className="text-center">
                <div className="font-medium leading-6 text-gray-600">Low</div>
                <div>{Math.round(state.current.main.temp_min)}</div>
              </div>
              <div className="text-center">
                <div className="font-medium leading-6 text-gray-600">High</div>
                <div>{Math.round(state.current.main.temp_max)}</div>
              </div>
            </div>
          </>
        )}
      </div>

      <Notifications />
    </div>
  );
}

export default Component;
