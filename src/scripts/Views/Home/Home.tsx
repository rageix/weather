import SearchBox from '../../Components/SearchBox/SearchBox.tsx';
import Notifications from '../../Components/Notifications/Notifications.tsx';
import { ArrowPathIcon, Cog6ToothIcon } from '@heroicons/react/20/solid';
import SettingsFormModal from '../../Components/SettingsFormModal/SettingsFormModal.tsx';
import CurrentWeather from '../../Components/CurrentWeather/CurrentWeather.tsx';
import EmitStore from '../../Stores/EmitStore.ts';
import SettingsStore from '../../Stores/SettingsStore.ts';
import { useEffect } from 'react';
import { isBlank } from '../../Shared/Lib.ts';
import HourlyWeather from '../../Components/HourlyWeather/HourlyWeather.tsx';

export function Component() {
  useEffect(() => {
    if (isBlank(SettingsStore.apiKey)) {
      EmitStore.emitShowSettings();
    }
  }, []);

  return (
    <div aria-label="home-view"
         className="container h-full min-h-screen mx-auto max-w-md p-4 bg-gradient-to-r from-sky-400 to-blue-600">
      <div className="flex items-start items-center">
        <div className="flex-shrink-0 mr-2">
          <ArrowPathIcon
            aria-label="reload"
            className="h-9 text-gray-200 hover:text-gray-300 cursor-pointer"
            aria-hidden="true"
            onClick={EmitStore.emitReloadWeather}
          />
        </div>
        <div className="flex-1">
          <SearchBox />
        </div>
        <div className="flex-shrink-0 ml-2">
          <Cog6ToothIcon
            aria-label="show-settings"
            className="h-9 text-gray-200 hover:text-gray-300 cursor-pointer"
            aria-hidden="true"
            onClick={EmitStore.emitShowSettings}
          />
        </div>
      </div>
      <CurrentWeather />
      <HourlyWeather />
      <Notifications />
      <SettingsFormModal />
    </div>
  );
}

export default Component;
