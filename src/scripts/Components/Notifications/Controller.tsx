import { Dispatch, SetStateAction, useState } from 'react';
import emitStore, { emitterMessage } from '../../Stores/EmitStore.ts';

enum NotificationType {
  Error = 0,
}

interface Notification {
  type: NotificationType;
  message: string;
}

interface State {
  items: Notification[];
}

const defaultState: State = {
  items: [],
};

export default class Controller {
  state: State;
  updateState: Dispatch<SetStateAction<State>>;

  setup = () => {
    emitStore.emitter.on(
      emitterMessage.notificationError,
      this.onEmitNotificationError,
    );
  };

  teardown = () => {
    emitStore.emitter.removeListener(
      emitterMessage.notificationError,
      this.onEmitNotificationError,
    );
  };

  onRender = () => {
    [this.state, this.updateState] = useState<State>(defaultState);
  };

  setState = (state: State) => {
    this.updateState(state);
  };

  onEmitNotificationError = (message: string) => {
    const state = { ...this.state };
    state.items.push({ message: message, type: NotificationType.Error });
    this.setState(state);
  };

  onClickDismiss = (index: number) => {
    const state = { ...this.state };
    state.items.splice(index, 1);
    this.updateState(state);
  };
}
