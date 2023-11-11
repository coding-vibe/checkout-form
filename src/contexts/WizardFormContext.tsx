import { createContext } from 'react';
import FormScreens from 'constants/formScreens';

export const initialFormValues = {
  [FormScreens.PERSONAL_DETAILS]: {
    order: 0,
    values: { firstName: '', lastName: '', email: '', phoneNumbers: [''] },
  },
  [FormScreens.DELIVERY_MODE]: {
    order: 1,
    values: { deliveryMode: null },
  },
  [FormScreens.COURIER_DELIVERY_DETAILS]: {
    order: 2,
    values: {
      date: null,
      time: '',
      city: '',
      street: '',
      house: '',
      flat: null,
      intercom: null,
      hasElevator: false,
    },
  },
  [FormScreens.POST_DELIVERY_DETAILS]: {
    order: 3,
    values: {
      postCompany: null,
      postOffice: null,
    },
  },
  [FormScreens.PAYMENT_METHOD]: {
    order: 4,
    values: { paymentMethod: null },
  },
  [FormScreens.CREDIT_CARD_DETAILS]: {
    order: 5,
    values: {
      cardNumber: null,
      cvvCode: null,
      expirationDate: '',
    },
  },
  [FormScreens.FORM_SUBMISSION]: {
    order: 6,
    values: { isAgree: false },
  },
  [FormScreens.FORM_SUCCESS]: {
    order: 7,
  },
};

export type InitialFormValuesType = typeof initialFormValues;

export const saveFormValues = <T extends Exclude<FormScreens, 'FORM_SUCCESS'>>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: (typeof initialFormValues)[T]['values'],
) => {};

const initialValue = {
  formValues: initialFormValues,
  onSaveFormValues: saveFormValues,
};

const WizardFormContext = createContext<typeof initialValue>(initialValue);

export default WizardFormContext;
