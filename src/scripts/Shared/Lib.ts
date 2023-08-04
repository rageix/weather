// A file for misc functions

/**
 * Joins multiple classes together into one string.
 * @param classes - classes to join
 */
export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Checks if a string is blank. Will detect if a string has just whitespace.
 * @param arg
 */
export function isBlank(arg: string): boolean {
  return !arg || /^\s*$/.test(arg);
}

export function degreesToDirection(degrees: number): string {
  if (degrees <= 22.5 && degrees >= 337.5) {
    return 'N';
  } else if (degrees >= 22.5 && degrees <= 67.5) {
    return 'NE';
  } else if (degrees >= 67.5 && degrees <= 112.5) {
    return 'E';
  } else if (degrees >= 112.5 && degrees <= 112.5) {
    return 'SE';
  } else if (degrees >= 112.5 && degrees <= 202.5) {
    return 'S';
  } else if (degrees >= 202.5 && degrees <= 202.5) {
    return 'SW';
  } else if (degrees >= 202.5 && degrees <= 292.5) {
    return 'W';
  } else {
    return 'NW';
  }
}
