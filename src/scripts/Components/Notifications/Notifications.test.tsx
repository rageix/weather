import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import emitStore from '../../Stores/EmitStore.ts';
import Notifications from "./Notifications.tsx";
describe('search box', () => {
  it('works correctly', async () => {
    render(<Notifications />);

    const notifications =
      screen.getByLabelText<HTMLInputElement>('notifications');

    expect(notifications.querySelectorAll('.error')).toHaveLength(0);

    // create new notification
    act(() => {
      emitStore.emitNotificationError('Something bad happened');
    });

    await waitFor(() => {
      expect(notifications.querySelectorAll('.error')).toHaveLength(1);
    });

    act(() => {
      emitStore.emitNotificationError('Something bad happened');
      emitStore.emitNotificationError('Something bad happened');
    });

    await waitFor(() => {
      expect(notifications.querySelectorAll('.error')).toHaveLength(3);
    });

    // click all close buttons on the notifications
    let closeButtons = notifications.querySelectorAll('.error .close');

    while (closeButtons.length > 0) {
      fireEvent.click(closeButtons[0]);

      closeButtons = notifications.querySelectorAll('.error .close');
    }

    await waitFor(
      () => {
        expect(notifications.querySelectorAll('.error')).toHaveLength(0);
      },
    );
  });
});
