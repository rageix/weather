import Controller from './Controller.tsx';
import { UnitOption, unitOptions } from '../../Shared/Units.ts';
import FormErrors from '../FormError/FormErrors.tsx';
import { fieldNotValid } from '../../Shared/Forms.ts';
import FormErrorIcon from '../FormErrorIcon/FormErrors.tsx';
import { classNames } from '../../Shared/Lib.ts';

const controller: Controller = new Controller();

export default function SettingsForm() {
  controller.onRender();
  const state = controller.state;

  return (
    <div aria-label="settings-form">
      <p className="text-sm font-bold text-gray-900">
        What units would you like to use?
      </p>
      <fieldset className="mt-2">
        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          {unitOptions.map((option: UnitOption) => (
            <div
              key={option.value}
              className="flex items-center"
            >
              <input
                aria-label={option.value}
                name="notification-method"
                type="radio"
                checked={state.unit.value === option.value}
                className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-400"
                onChange={() => controller.onChangeUnit(option)}
              />
              <label
                htmlFor={option.value}
                className="ml-3 block text-sm font-medium leading-6 text-gray-900"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      <div className="mt-4">
        <label
          htmlFor="apiKey"
          className="block text-sm font-bold leading-6 text-gray-900"
        >
          Api Key
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="apiKey"
            id="apiKey"
            aria-label="api-key"
            className={classNames(
              'block w-full shadow-sm rounded-md border-0 py-1.5 ring-1 ring-inset pr-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
              fieldNotValid('apiKey', state.errors)
                ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-sky-600',
            )}
            placeholder=""
            aria-invalid={fieldNotValid('apiKey', state.errors)}
            aria-describedby="apiKey-error"
            value={state.apiKey}
            onChange={controller.onChangeApiKey}
          />
          {fieldNotValid('apiKey', state.errors) && <FormErrorIcon />}
        </div>
        <FormErrors
          errors={state.errors}
          path="apiKey"
          id="apiKey-error"
        />
      </div>
    </div>
  );
}