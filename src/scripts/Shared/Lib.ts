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
    return (!arg || /^\s*$/.test(arg));
}