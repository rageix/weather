import { Dispatch, SetStateAction, useState } from 'react';
import { Location } from '../../Shared/Location.ts';
import EmitStore from '../../Stores/EmitStore.ts';
import SettingsStore from '../../Stores/SettingsStore.ts';
import { HourlyResponse, getHourly } from '../../Api/Hourly.ts';

interface State {
  location: Location;
  hourly: HourlyResponse;
  loading: boolean;
}

function defaultState(): State {
  return {
    location: SettingsStore.location || null,
    hourly: null,
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
      hourly: null,
      loading: true,
    });

    try {
      const response = await getHourly();
      this.setState({
        ...this.state,
        hourly: response,
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
        hourly: null,
        loading: false,
      });
    }
  };

  onReload = () => {
    this.loadLocation().catch();
  };
}
