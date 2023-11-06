import { createContext } from 'react';
import FormScreens from 'constants/formScreens';

export const initialFormValues = {
  [FormScreens.CREDIT_CARD_DETAILS]: {
    cardNumber: null,
    cvvCode: null,
    expirationDate: '',
  },
  [FormScreens.COURIER_DELIVERY_DETAILS]: {
    date: new Date(),
    time: '',
    city: '',
    street: '',
    house: '',
    flat: null,
    intercom: null,
    hasElevator: false,
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
  [FormScreens.POST_DELIVERY_DETAILS]: {
    postCompany: null,
    postOffice: null,
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
