import { EventEmitter } from 'eventemitter3';

export enum emitterMessage {
  notificationError = 'notificationError',
}

export class EmitStore {
  emitter = new EventEmitter();

  emitNotificationError = (arg: string) => {
    this.emitter.emit(emitterMessage.notificationError, arg);
  };
}

const self = new EmitStore();
export default self;
