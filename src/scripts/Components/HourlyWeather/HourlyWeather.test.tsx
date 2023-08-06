import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { setGoodStorage } from '../../../__tests__/Mocks/LocalStorage.ts';
import HourlyWeather from './HourlyWeather.tsx';
import SettingsStore from '../../Stores/SettingsStore.ts';

describe('hourly weather', () => {
  it('renders correctly', async () => {
    setGoodStorage();
    SettingsStore.load();

    render(<HourlyWeather />);

    await waitFor(() => {
      expect(screen.getByLabelText('hourly-weather-results')).toBeVisible();
    });

    expect(
      screen.getByLabelText('hourly-weather-results').querySelectorAll('.item'),
    ).toHaveLength(8);
  });
});
