import { createContext } from 'react';
import FormScreens from 'constants/formScreens';

// eslint-disable-next-line react-refresh/only-export-components
export const initialFormValues = {
  [FormScreens.PERSONAL_DETAILS]: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumbers: [''],
  },
  [FormScreens.DELIVERY_MODE]: {
    deliveryMode: null,
  },
};

export type InitialFormValuesType = typeof initialFormValues;

// eslint-disable-next-line react-refresh/only-export-components
export const saveFormValues = <T extends FormScreens>(
  _: T,
  __: (typeof initialFormValues)[T],
) => {};

const initialValue = {
  formValues: initialFormValues,
  onSaveFormValues: saveFormValues,
};

const WizardFormContext = createContext<typeof initialValue>(initialValue);

export default WizardFormContext;
