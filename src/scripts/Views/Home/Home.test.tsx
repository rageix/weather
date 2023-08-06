import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  setGoodStorage
} from '../../../__tests__/Mocks/LocalStorage.ts';
import EmitStore from '../../Stores/EmitStore.ts';
import SettingsStore from "../../Stores/SettingsStore.ts";
import Component from './Home.tsx';

describe('home view', () => {

  it('renders correctly with good storage', async () => {
    setGoodStorage();
    SettingsStore.load();

    const spy = vi.spyOn(EmitStore, 'emitReloadWeather');

    render(<Component />);

    await waitFor(() => {
      expect(screen.getByLabelText('home-view')).toBeVisible();
    });

    fireEvent.click(screen.getByLabelText('reload'));

    expect(spy).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByLabelText('show-settings'));

    await waitFor(() => {
      expect(screen.getByLabelText('settings-form')).toBeVisible();
    });
  });

  it('should show settings modal on first load', async () => {
    localStorage.clear();
    SettingsStore.load();

    render(<Component />);

    await waitFor(() => {
      expect(screen.getByLabelText('home-view')).toBeVisible();
    });

    await waitFor(() => {
      expect(screen.getByLabelText('settings-form')).toBeVisible();
    });
  });

});
