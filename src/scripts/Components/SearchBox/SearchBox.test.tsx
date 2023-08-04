import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { setGoodStorage } from '../../../__tests__/Mocks/LocalStorage.ts';

describe('search box', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('renders correctly', async () => {
    setGoodStorage();

    const component = await import('./SearchBox.tsx');
    const result = render(<component.SearchBox />);

    expect(screen.getByLabelText('search-box')).toBeVisible();

    const searchInput = screen.getByLabelText<HTMLInputElement>('search-input');
    fireEvent.change(searchInput, { target: { value: 'milwaukee' } });

    expect(searchInput.value).toBe('milwaukee');

    await waitFor(() => {
      expect(screen.getByLabelText('search-options')).toBeVisible();
      expect(
        result.container.querySelectorAll(
          '[aria-label="search-options"] .option',
        ),
      ).toHaveLength(3);
    });

    fireEvent.click(
      result.container.querySelectorAll(
        '[aria-label="search-options"] .option',
      )[0],
    );

    await waitFor(() => {
      expect(searchInput.value).toBe('Milwaukee, Wisconsin, US');
    });
  });
});
