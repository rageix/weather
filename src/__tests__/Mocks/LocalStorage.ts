import { Unit } from '../../scripts/Shared/Units.ts';
import { Location } from '../../scripts/Shared/Location.ts';
import { milwaukee } from './Locations.ts';
import { localStorageKey } from '../../scripts/Stores/Enums.ts';

interface TestLocalStorage {
  apiKey: string;
  unit: Unit;
  location: Location;
}

export const goodStorage: TestLocalStorage = {
  apiKey: 'testAPIKey',
  unit: 'imperial',
  location: milwaukee,
};

export function setGoodStorage() {
  window.localStorage.setItem(localStorageKey.apiKey, goodStorage.apiKey);
  window.localStorage.setItem(localStorageKey.unit, goodStorage.unit);
  window.localStorage.setItem(
    localStorageKey.location,
    JSON.stringify(goodStorage.location),
  );
}
