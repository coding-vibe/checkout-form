import { createContext } from 'react';
import FormScreens from 'constants/formScreens';

export const initialFormValues = {
  [FormScreens.PERSONAL_DETAILS]: {
    firstName: 'Mariia',
    lastName: 'Korniakova',
    email: 'k.m@gmail.com',
    phoneNumbers: ['+380634241240'],
  },
  [FormScreens.DELIVERY_MODE]: {
    deliveryMode: 'post',
  },
  [FormScreens.PAYMENT_METHOD]: {
    paymentMethod: 'credit card',
  },
  [FormScreens.CREDIT_CARD_DETAILS]: {
    cardNumber: '1111 1111 1111 1111 1111',
    cvvCode: '111',
    expirationDate: '27/16',
  },
  [FormScreens.FORM_SUBMISSION]: null,
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
