import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { setGoodStorage } from '../../../__tests__/Mocks/LocalStorage.ts';
import SettingsStore from "../../Stores/SettingsStore.ts";
import SearchBox from "./SearchBox.tsx";

describe('search box', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('renders correctly', async () => {
    setGoodStorage();
    SettingsStore.load();

    render(<SearchBox />);

    expect(screen.getByLabelText('search-box')).toBeVisible();

    const searchInput = screen.getByLabelText<HTMLInputElement>('search-input');
    fireEvent.change(searchInput, { target: { value: 'milwaukee' } });

    expect(searchInput.value).toBe('milwaukee');

    const searchOptions = screen.getByLabelText('search-options');

    await waitFor(() => {
      expect(searchOptions).toBeVisible();
    });

    await waitFor(() => {
      expect(
        searchOptions.querySelectorAll(
          '.option',
        ),
      ).toHaveLength(3);
    });

    fireEvent.click(
      searchOptions.querySelectorAll(
        '.option',
      )[0],
    );

    await waitFor(() => {
      expect(searchInput.value).toBe('Milwaukee, Wisconsin, US');
    });

    expect(SettingsStore.location.value).toBe('Milwaukee, Wisconsin, US');
  });
});
