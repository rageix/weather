import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { setGoodStorage } from '../../../__tests__/Mocks/LocalStorage.ts';

describe('hourly weather', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('renders correctly', async () => {
    setGoodStorage();

    const component = await import('./HourlyWeather.tsx');
    const result = render(<component.HourlyWeather />);

    await waitFor(() => {
      expect(screen.getByLabelText('hourly-weather-results')).toBeVisible();
    });

    expect(
      result.container.querySelectorAll(
        '[aria-label="hourly-weather-results"] .item',
      ),
    ).toHaveLength(8);
  });
});
