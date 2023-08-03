import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Location } from '../../Shared/Location.ts';
import {UnitOption, unitOptions} from "../../Components/Units/Units.tsx";
import {CurrentResponse} from "../../Api/Current.ts";
import {getCurrent} from "../../Api/Current.ts";
import EmitStore from "../../Stores/EmitStore.ts";
import ApiKeyStore from "../../Stores/ApiKeyStore.ts";
import {isBlank} from "../../Shared/Lib.ts";

interface State {
  search: string;
  location: Location;
  units: UnitOption;
  current: CurrentResponse;
  loading: boolean;
  showSettings: boolean;
}

const defaultState: State = {
  search: '',
  location: null,
  units: unitOptions[0],
  current: null,
  loading: false,
  showSettings: isBlank(ApiKeyStore.apiKey)
};

export default class Controller {
  state: State;
  updateState: Dispatch<SetStateAction<State>>;

  onRender = () => {
    [this.state, this.updateState] = useState<State>(defaultState);
  };

  setState = (state: State) => {
    this.updateState(state);
  };

  onChangeLocation = async (location: Location) => {
    this.setState({ ...this.state, location: location, loading: true });

    try {
      const response = await getCurrent(location.lat, location.lon, this.state.units.value);
      this.setState({ ...this.state, current: response, loading: false });
    } catch (e) {
      const error = 'Failed to get current weather data for location.';
      console.log(error);
      console.log(e);
      EmitStore.emitNotificationError(error);
      this.setState({ ...this.state, current: null, loading: false });
    }
  };

  onChangeUnits = (unitOption: UnitOption) => {
    this.setState({ ...this.state, units: unitOption });
  };

  onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, search: event.target.value });
  };

  onClickSettings = () => {
    this.setState({ ...this.state, showSettings: !this.state.showSettings });
  }
}
