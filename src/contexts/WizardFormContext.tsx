import { createContext } from 'react';
import FormScreens from 'constants/formScreens';

// eslint-disable-next-line react-refresh/only-export-components
export const initialFormValues = {
  [FormScreens.CREDIT_CARD_DETAILS]: {
    cardNumber: null,
    cvvCode: null,
    expirationDate: '',
  },
  [FormScreens.DELIVERY_MODE]: {
    deliveryMode: null,
  },
  [FormScreens.PAYMENT_METHOD]: {
    paymentMethod: null,
  },
  [FormScreens.PERSONAL_DETAILS]: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumbers: [''],
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
