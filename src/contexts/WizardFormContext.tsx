import { createContext } from 'react';
import FormScreens from 'constants/formScreens';
import StepOrder from 'constants/stepOrder';

export const initialFormValues = {
  [FormScreens.PERSONAL_DETAILS]: {
    order: StepOrder.PERSONAL_DETAILS,
    values: { firstName: '', lastName: '', email: '', phoneNumbers: [''] },
  },
  [FormScreens.DELIVERY_MODE]: {
    order: StepOrder.DELIVERY_MODE,
    values: { deliveryMode: null },
  },
  [FormScreens.COURIER_DELIVERY_DETAILS]: {
    order: StepOrder.COURIER_DELIVERY_DETAILS,
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
    order: StepOrder.POST_DELIVERY_DETAILS,
    values: {
      postCompany: null,
      postOffice: null,
    },
  },
  [FormScreens.PAYMENT_METHOD]: {
    order: StepOrder.PAYMENT_METHOD,
    values: { paymentMethod: null },
  },
  [FormScreens.CREDIT_CARD_DETAILS]: {
    order: StepOrder.CREDIT_CARD_DETAILS,
    values: {
      cardNumber: null,
      cvvCode: null,
      expirationDate: '',
    },
  },
  [FormScreens.FORM_SUBMISSION]: {
    order: StepOrder.FORM_SUBMISSION,
    values: { isAgree: false },
  },
  [FormScreens.FORM_SUCCESS]: {
    order: StepOrder.FORM_SUCCESS,
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
