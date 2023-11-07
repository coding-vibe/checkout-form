import { createContext } from 'react';
import FormScreens from 'constants/formScreens';

export const initialFormValues = {
  [FormScreens.PERSONAL_DETAILS]: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumbers: [''],
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
  [FormScreens.CREDIT_CARD_DETAILS]: {
    cardNumber: null,
    cvvCode: null,
    expirationDate: '',
  },
  [FormScreens.FORM_SUBMISSION]: {
    isAgree: false,
  },
  [FormScreens.POST_DELIVERY_DETAILS]: {
    postCompany: null,
    postOffice: null,
  },
};

export type InitialFormValuesType = typeof initialFormValues;

export const saveFormValues = <T extends Exclude<FormScreens, 'FORM_SUCCESS'>>(
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
