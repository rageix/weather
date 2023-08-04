export type Unit = 'standard' | 'metric' | 'imperial';

export const units = ['standard', 'metric', 'imperial'];

export interface UnitOption {
  value: Unit;
  label: string;
}

export const unitOptions: UnitOption[] = [
  { value: 'imperial', label: 'Imperial (℉, miles/hour)' },
  { value: 'metric', label: 'Metric (°C, meter/sec)' },
  { value: 'standard', label: 'Standard (K, meter/sec)' },
];

/**
 * Checks if arg is a unit.
 * @param arg
 */
export function isUnit(arg: string): boolean {
  return units.indexOf(arg) > -1;
}
