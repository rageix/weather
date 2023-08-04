import { ValidationErrorItem } from 'joi';

export function fieldNotValid(
  path: string | number,
  errors: ValidationErrorItem[],
): boolean {
  return errors.findIndex((v) => v.path.indexOf(path) > -1) > -1;
}
