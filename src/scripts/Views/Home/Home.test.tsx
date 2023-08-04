import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  setGoodStorage
} from '../../../__tests__/Mocks/LocalStorage.ts';

describe('home view', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('renders correctly with good storage', async () => {
    setGoodStorage();

    const component = await import('./Home.tsx');
    render(<component.Component />);

    await waitFor(() => {
      expect(screen.getByLabelText('home-view')).toBeVisible();
    });

    fireEvent.click(screen.getByLabelText('show-settings'));

    await waitFor(() => {
      expect(screen.getByLabelText('settings-form-modal')).toBeVisible();
    });
  });

  // it('should show settings modal if no api key is set', async () => {
  //   // window.localStorage.setItem(localStorageKey.apiKey, '');
  //   window.localStorage.clear();
  //   console.log('apiKey: ' + window.localStorage.getItem(localStorageKey.apiKey));
  //
  //   const component = await import('./Home.tsx');
  //   const result = render(<component.Component key={2} />);
  //
  //   await waitFor(() => {
  //     expect(screen.getByLabelText('home-view')).toBeVisible();
  //   });
  //
  //   await waitFor(() => {
  //     // expect(screen.getByLabelText('settings-form-modal')).toBeVisible();
  //     console.log('settings form');
  //     console.log(result.container.querySelector('[aria-label="settings-form-modal"]'));
  //     expect(
  //       result.container.querySelector('[aria-label="settings-form-modal"]'),
  //     ).toBeVisible();
  //   });
  // });
});
