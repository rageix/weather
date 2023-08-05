import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('home view', () => {
  it('should show settings modal on first load', async () => {
    const component = await import('../Home.tsx');
    render(<component.Component />);

    await waitFor(() => {
      expect(screen.getByLabelText('home-view')).toBeVisible();
    });

    await waitFor(() => {
      expect(screen.getByLabelText('settings-form')).toBeVisible();
    });
  });
});
