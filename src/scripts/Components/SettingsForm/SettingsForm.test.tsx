import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {unitOptions} from "../../Shared/Units.ts";
import SettingsStore from "../../Stores/SettingsStore.ts";
import SettingsForm from "./SettingsForm.tsx";
describe('search box', () => {

  it('works correctly', async () => {

    render(<SettingsForm />);

    expect(screen.getByLabelText<HTMLInputElement>('settings-form')).toBeVisible();

    const imperialInput = screen.getByLabelText<HTMLInputElement>(unitOptions[0].value);
    const metricInput = screen.getByLabelText<HTMLInputElement>(unitOptions[1].value);
    const standardInput = screen.getByLabelText<HTMLInputElement>(unitOptions[2].value);

    expect(imperialInput).toBeChecked();
    expect(metricInput).not.toBeChecked();
    expect(standardInput).not.toBeChecked();

    fireEvent.click(metricInput);

    expect(imperialInput).not.toBeChecked();
    expect(metricInput).toBeChecked();
    expect(standardInput).not.toBeChecked();
    expect(SettingsStore.unit).toBe(unitOptions[1].value);

    fireEvent.click(standardInput);

    expect(imperialInput).not.toBeChecked();
    expect(metricInput).not.toBeChecked();
    expect(standardInput).toBeChecked();
    expect(SettingsStore.unit).toBe(unitOptions[2].value);

    fireEvent.click(imperialInput);
    expect(imperialInput).toBeChecked();
    expect(metricInput).not.toBeChecked();
    expect(standardInput).not.toBeChecked();
    expect(SettingsStore.unit).toBe(unitOptions[0].value);

    const apiKeyInput = screen.getByLabelText<HTMLInputElement>('api-key');
    expect(apiKeyInput).toBeVisible();

    const errorClasses = '.text-red-900.ring-red-300';

    expect(apiKeyInput.matches(errorClasses)).toBeTruthy();

    fireEvent.change(apiKeyInput, { target: { value: 'testKey' } });

    expect(apiKeyInput.value).toBe('testKey');
    expect(SettingsStore.apiKey).toBe('testKey');

    expect(apiKeyInput.matches(errorClasses)).toBeFalsy();

    fireEvent.change(apiKeyInput, { target: { value: '' } });

    expect(apiKeyInput.matches(errorClasses)).toBeTruthy();
    expect(SettingsStore.apiKey).toBe('');

  });

});
