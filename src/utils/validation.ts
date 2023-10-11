export const maxValue = (max: number, value: number) =>
  value <= max ? undefined : `Should be less than ${max}`;

// export const minValue = (min: number) => (value: number) =>
//   Number.isNaN(value) || value >= min
//     ? undefined
//     : `Should be greater than ${min}`;

export const validateEmail = (value: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return emailRegex.test(value) ? undefined : 'Invalid email address';
};

export const validateIsRequired = (value: string) =>
  value ? undefined : 'Required ';

export const validatePhoneNumber = (value: string) => {
  const phoneNumberRegex = /^\+[0-9]{2}[0-9]{10}$/;

  return phoneNumberRegex.test(value) ? undefined : 'Invalid phone number';
};
