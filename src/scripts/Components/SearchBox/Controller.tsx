import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Location } from '../../Shared/Location.ts';
import { GeoCodeResponseItem, getGeo } from '../../Api/Geo.ts';
import _ from 'lodash';
import EmitStore from '../../Stores/EmitStore.ts';
import { isBlank } from '../../Shared/Lib.ts';

interface State {
  items: Location[];
  text: string;
}

const defaultState: State = {
  items: [],
  text: '',
};

export default class Controller {
  state: State;
  updateState: Dispatch<SetStateAction<State>>;
  debounce = _.debounce(async () => await this.updateItems(), 500);

  onRender = () => {
    [this.state, this.updateState] = useState<State>(defaultState);
  };

  setState = (state: State) => {
    this.updateState(state);
  };

  updateItems = async () => {
    let items: Location[] = [];

    if (!isBlank(this.state.text)) {
      let results: GeoCodeResponseItem[];
      try {
        results = await getGeo(this.state.text);
        items = results.map((v: GeoCodeResponseItem) => {
          return {
            lat: v.lat,
            lon: v.lon,
            value: `${v.name}, ${v.state}, ${v.country}`,
          };
        });
        this.setState({ ...this.state, items: items });
      } catch (e) {
        const error = 'Failed to lookup geo location.';
        console.log(error);
        console.log(e);
        EmitStore.emitNotificationError(error);
      }
    }
  };

  onChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('onChangeText');
    this.setState({ ...this.state, text: event.target.value });
    this.debounce();
  };
}
