import { EventEmitter } from 'eventemitter3';
import { Location } from '../Shared/Location.ts';

export enum emitterMessage {
  notificationError = 'notificationError',
  showSettings = 'showSettings',
  locationChanged = 'locationChanged',
  reloadWeather = 'reloadWeather',
  settingsLoaded = 'settingsLoaded'
}

export class EmitStore {
  emitter = new EventEmitter();

  emitNotificationError = (arg: string) => {
    this.emitter.emit(emitterMessage.notificationError, arg);
  };

  emitShowSettings = () => {
    this.emitter.emit(emitterMessage.showSettings);
  };

  emitReloadWeather = () => {
    this.emitter.emit(emitterMessage.reloadWeather);
  };

  emitLocationChanged = (arg: Location) => {
    this.emitter.emit(emitterMessage.locationChanged, arg);
  };

  emitSettingsLoaded = () => {
    this.emitter.emit(emitterMessage.settingsLoaded);
  };

}

const self = new EmitStore();
export default self;
