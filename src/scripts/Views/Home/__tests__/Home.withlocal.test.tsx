import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  setGoodStorage
} from '../../../../__tests__/Mocks/LocalStorage.ts';

describe('home view', () => {
  // afterEach(() => {
  //   window.localStorage.clear();
  // });

  it('renders correctly with good storage', async () => {
    setGoodStorage();

    const component = await import('../Home.tsx');
    render(<component.Component />);

    await waitFor(() => {
      expect(screen.getByLabelText('home-view')).toBeVisible();
    });

    fireEvent.click(screen.getByLabelText('show-settings'));

    await waitFor(() => {
      expect(screen.getByLabelText('settings-form')).toBeVisible();
    });
  });

  // it('should show settings modal on first load', async () => {
  //   localStorage.clear();
  //
  //   const component = await import('../Home.tsx');
  //   render(<component.Component />);
  //
  //   await waitFor(() => {
  //     expect(screen.getByLabelText('home-view')).toBeVisible();
  //   });
  //
  //   await waitFor(() => {
  //     expect(screen.getByLabelText('settings-form')).toBeVisible();
  //   });
  // });

});
