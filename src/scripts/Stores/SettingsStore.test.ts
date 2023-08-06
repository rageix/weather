import { describe, expect, it } from 'vitest';
import SettingsStore from './SettingsStore.ts';
import { localStorageKey } from './Enums.ts';
import { milwaukee } from '../../__tests__/Mocks/Locations.ts';
import {
  goodStorage,
  setGoodStorage
} from "../../__tests__/Mocks/LocalStorage.ts";

describe('settings store', () => {
  it('works correctly when empty', async () => {
    localStorage.clear();
    SettingsStore.load();

    expect(SettingsStore.unit).toBe('imperial');
    expect(SettingsStore.location).toBe(undefined);
    expect(SettingsStore.apiKey).toBe(null);

    const apiKey = 'testKey';
    SettingsStore.apiKey = apiKey;

    expect(SettingsStore.apiKey).toBe(apiKey);
    expect(localStorage.getItem(localStorageKey.apiKey)).toBe(apiKey);

    SettingsStore.location = milwaukee;

    expect(SettingsStore.location).toBe(milwaukee);
    expect(localStorage.getItem(localStorageKey.location)).toBe(
      JSON.stringify(milwaukee),
    );

    SettingsStore.unit = 'metric';
    expect(SettingsStore.unit).toBe('metric');
    expect(localStorage.getItem(localStorageKey.unit)).toBe('metric');
  });

  it('loads from local storage correctly', async () => {
    setGoodStorage();
    SettingsStore.load();

    expect(SettingsStore.unit).toBe(goodStorage.unit);
    expect(SettingsStore.location.value).toBe(milwaukee.value);
    expect(SettingsStore.location.lat).toBe(milwaukee.lat);
    expect(SettingsStore.location.lon).toBe(milwaukee.lon);
    expect(SettingsStore.apiKey).toBe(goodStorage.apiKey);

  });
});
