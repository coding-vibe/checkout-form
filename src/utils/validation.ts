import { FieldValidator } from 'final-form';

export function composeValidators<T>(...validators: FieldValidator<T>[]) {
  const fn: FieldValidator<T> = (...args) =>
    validators.reduce<string | undefined>(
      // We use type casting, because meta.error type is 'any' and we can't override this
      (error, validator) => error || (validator(...args) as string | undefined),
      undefined,
    );

  return fn;
}

export const validateEmail = (value: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return emailRegex.test(value) ? undefined : 'Invalid email address';
};

export const validateIsRequired = (value: string) =>
  value ? undefined : 'Required ';

export const validatePhoneNumber = (value: string) => {
  const phoneNumberRegex = /^\+\d{2}\d{10}$/;

  return phoneNumberRegex.test(value) ? undefined : 'Invalid phone number';
};
