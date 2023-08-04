import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { setGoodStorage } from '../../../__tests__/Mocks/LocalStorage.ts';

describe('current weather', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('renders correctly', async () => {
    setGoodStorage();

    const component = await import('./CurrentWeather.tsx');
    const result = render(<component.CurrentWeather />);

    await waitFor(() => {
      expect(screen.getByLabelText('current-weather-results')).toBeVisible();
      expect(
        result.container.querySelector(
          '[aria-label="current-weather-results"] #currentTemp',
        ).innerHTML,
      ).toBe('80');
    });
  });
});
