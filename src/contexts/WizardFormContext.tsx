import { createContext } from 'react';
import FormScreens from 'constants/formScreens';

export const initialFormValues = {
  [FormScreens.CREDIT_CARD_DETAILS]: {
    cardNumber: null,
    cvvCode: null,
    expirationDate: '',
  },
  [FormScreens.DELIVERY_MODE]: {
    deliveryMode: null,
  },
  [FormScreens.FORM_SUBMISSION]: null,
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

export const saveFormValues = <T extends FormScreens>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: (typeof initialFormValues)[T],
) => {};

const initialValue = {
  formValues: initialFormValues,
  onSaveFormValues: saveFormValues,
};

const WizardFormContext = createContext<typeof initialValue>(initialValue);

export default WizardFormContext;
