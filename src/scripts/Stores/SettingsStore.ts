import emitStore from './EmitStore.ts';
import { isUnit, Unit } from '../Shared/Units.ts';
import { Location } from '../Shared/Location.ts';
import { isBlank } from '../Shared/Lib.ts';
import {localStorageKey} from "./Enums.ts";

class SettingsStore {
  _apiKey: string;
  _unit: Unit = 'imperial';
  _location: Location;

  constructor() {
    try {
      const params = new URLSearchParams(document.location.search);
      const apiKey = params.get('apiKey');

      if (apiKey) {
        this.apiKey = apiKey;
      } else {
        this._apiKey = localStorage.getItem(localStorageKey.apiKey);
      }
    } catch (e) {
      const errMessage = 'No appId is found!';
      console.log(errMessage);
      console.log(e);
      emitStore.emitNotificationError(errMessage);
    }

    try {
      const params = new URLSearchParams(document.location.search);
      const unit = params.get('unit');

      if (isUnit(unit)) {
        this.unit = unit as Unit;
      } else {
        const unit = localStorage.getItem(localStorageKey.unit) as Unit;
        if (isUnit(unit)) {
          this._unit = unit;
        }
      }
    } catch (e) {
      console.log('No unit is found using default.');
    }

    try {
      const locationText = localStorage.getItem(localStorageKey.location);
      if (!isBlank(locationText)) {
        this._location = JSON.parse(locationText);
      }
    } catch (e) {
      console.log('No location is found using default.');
    }

    // console.log(`loaded unit: ${this._unit}`);
    console.log(`loaded apiKey: ${this._apiKey}`);
    // console.log(`location: ${JSON.stringify(this._location)}`);
  }

  get apiKey() {
    return this._apiKey;
  }

  set apiKey(apiKey: string) {
    localStorage.setItem(localStorageKey.apiKey, apiKey);
    this._apiKey = apiKey;
  }

  get unit() {
    return this._unit;
  }

  set unit(unit: Unit) {
    localStorage.setItem(localStorageKey.unit, unit);
    this._unit = unit;
  }

  get location() {
    return this._location;
  }

  set location(location: Location) {
    localStorage.setItem(localStorageKey.location, JSON.stringify(location));
    this._location = location;
  }
}

const store = new SettingsStore();
export default store;
