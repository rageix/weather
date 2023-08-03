import { Location } from '../../Shared/Location.ts';
import Controller from './Controller.tsx';
import { Combobox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { classNames } from '../../Shared/Lib.ts';

const controller: Controller = new Controller();

interface Props {
  selected: Location;
  onChange: (arg: Location) => void;
}

export default function SearchBox(props: Props) {
  controller.onRender();
  const state = controller.state;

  return (
    <Combobox
      as="div"
      value={props.selected}
      onChange={props.onChange}
    >
      <div className="relative">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          onChange={controller.onChangeText}
          displayValue={(item: Location) => item?.value || ''}
          placeholder="Enter City, State, Country"
        />

        {state.text.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {state.items.length === 0 &&
                <Combobox.Option
                    value={null}
                    className={() =>
                        classNames(
                            'relative cursor-default select-none py-2 pl-3 pr-9',
                             'text-gray-900',
                        )
                    }
                >
                  <span
                      className={classNames(
                          'block truncate',
                      )}
                  >
                      No locations found.
                    </span>
                </Combobox.Option>
            }
            {state.items.map((item: Location, index: number) => (
              <Combobox.Option
                key={index.toString() + item.value}
                value={item}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-sky-600 text-white' : 'text-gray-900',
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate',
                        selected && 'font-semibold',
                      )}
                    >
                      {item.value}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-sky-600',
                        )}
                      >
                        <CheckIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
