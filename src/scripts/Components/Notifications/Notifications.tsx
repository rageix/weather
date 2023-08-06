import { useEffect } from 'react';
import Controller from './Controller.tsx';
import Error from '../Error/Error.tsx';

const controller = new Controller();
export default function Notifications() {
  controller.onRender();

  useEffect(() => {
    controller.setup();

    return () => {
      controller.teardown();
    };
  }, []);

  const state = controller.state;

  return (
    <>
      <div
        aria-label="notifications"
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {state.items.map((v, i) => {
            return (
              <Error
                key={i}
                message={v.message}
                onDismiss={() => controller.onClickDismiss(i)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
