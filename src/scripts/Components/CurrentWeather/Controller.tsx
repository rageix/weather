import { Dispatch, SetStateAction, useState } from 'react';
import { Location } from '../../Shared/Location.ts';
import { CurrentResponse, getCurrent } from '../../Api/Current.ts';
import EmitStore from '../../Stores/EmitStore.ts';
import SettingsStore from '../../Stores/SettingsStore.ts';

interface State {
  location: Location;
  current: CurrentResponse;
  loading: boolean;
}

function defaultState(): State {
  return {
    location: SettingsStore.location || null,
    current: null,
    loading: false,
  };
}

export default class Controller {
  state: State;
  updateState: Dispatch<SetStateAction<State>>;

  onRender = () => {
    [this.state, this.updateState] = useState<State>(defaultState);
  };

  setState = (state: State) => {
    this.updateState(state);
  };

  loadLocation = async () => {
    this.setState({
      ...this.state,
      location: null,
      current: null,
      loading: true,
    });

    try {
      const response = await getCurrent();
      this.setState({
        ...this.state,
        current: response,
        loading: false,
      });
    } catch (e) {
      const error = `Failed to get current weather data for location: ${e}`;
      console.log(error);
      console.log(e);
      EmitStore.emitNotificationError(error);
      this.setState({
        ...this.state,
        location: null,
        current: null,
        loading: false,
      });
    }
  };

  onReload = () => {
    this.loadLocation().catch();
  };
}
