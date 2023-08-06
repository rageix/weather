import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { setGoodStorage } from '../../../__tests__/Mocks/LocalStorage.ts';
import SettingsStore from '../../Stores/SettingsStore.ts';
import CurrentWeather from './CurrentWeather.tsx';

describe('current weather', () => {
  it('renders correctly', async () => {
    setGoodStorage();
    SettingsStore.load();

    render(<CurrentWeather />);

    await waitFor(() => {
      expect(screen.getByLabelText('current-weather-results')).toBeVisible();
      expect(
        screen
          .getByLabelText('current-weather-results')
          .querySelector('#currentTemp').innerHTML,
      ).toBe('80');
    });
  });
});
