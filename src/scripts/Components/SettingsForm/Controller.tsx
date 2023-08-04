import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Unit } from '../../Shared/Units.ts';
import SettingsStore from '../../Stores/SettingsStore.ts';
import Joi, { ValidationErrorItem } from 'joi';
import EmitStore from '../../Stores/EmitStore.ts';

const schema = Joi.object({
  apiKey: Joi.string().alphanum().min(1).required(),
});

export interface UnitOption {
  value: Unit;
  label: string;
}

export const unitOptions: UnitOption[] = [
  { value: 'imperial', label: '℉' },
  { value: 'metric', label: '°C' },
  { value: 'standard', label: 'K' },
];

interface State {
  unit: UnitOption;
  apiKey: string;
  errors: ValidationErrorItem[];
}

function defaultState(): State {
  return {
    unit: unitOptions.find((v) => v.value === SettingsStore.unit),
    apiKey: SettingsStore.apiKey || '',
    errors: [],
  };
}

export default class Controller {
  state: State;
  updateState: Dispatch<SetStateAction<State>>;

  onRender = () => {
    [this.state, this.updateState] = useState<State>(
      this.validateForm(defaultState()),
    );
  };

  onShowSettings = () => {
    const state = this.validateForm(defaultState());
    this.setState(state);
  };

  setState = (state: State) => {
    this.updateState(state);
  };

  validateForm = (state: State): State => {
    state.errors = [];
    const result = schema.validate(state, {
      abortEarly: false,
      allowUnknown: true,
      errors: {
        label: false,
      },
    });

    if (result.error) {
      state.errors = result.error.details;
    }

    return state;
  };

  onChangeUnit = (unitOption: UnitOption) => {
    this.setState({ ...this.state, unit: unitOption });
    SettingsStore.unit = unitOption.value;
    EmitStore.emitReloadWeather();
  };

  onChangeApiKey = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    let state: State = { ...this.state, apiKey: value };
    state = this.validateForm(state);

    console.log('errors');
    console.log(state.errors);

    this.setState(state);
    SettingsStore.apiKey = value;
  };
}
