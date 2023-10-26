import { isFuture } from 'date-fns';
import { FieldValidator } from 'final-form';
import parser from 'utils/dateParser';

export function composeValidators<T>(...validators: FieldValidator<T>[]) {
  const fn: FieldValidator<T> = (...args) =>
    validators.reduce<string | undefined>(
      // We use type casting, because meta.error type is 'any' and we can't override this
      (error, validator) => error || (validator(...args) as string | undefined),
      undefined,
    );

  return fn;
}

export const validateDigitsCount =
  (count: number, entity: string) =>
  (value: string): undefined | string => {
    const digitsCountRegex = new RegExp(`\\d{${count}}$`);

    return digitsCountRegex.test(value) ? undefined : `Invalid ${entity}`;
  };

export const validateEmail = (value: string): undefined | string => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return emailRegex.test(value) ? undefined : 'Invalid email address';
};

export const validateIsFutureDate = (value: string): undefined | string => {
  const parsedDate = parser(value);

  if (!parsedDate) {
    return 'Invalid date';
  }

  return isFuture(parsedDate) ? undefined : 'Card expired';
};

export const validateIsRequired = (value: string): undefined | string =>
  value ? undefined : 'Required';

export const validatePhoneNumber = (value: string): undefined | string => {
  const phoneNumberRegex = /^\+\d{12}$/;

  return phoneNumberRegex.test(value) ? undefined : 'Invalid phone number';
};
