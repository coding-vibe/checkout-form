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
    subSteps: [],
  },
  [FormScreens.PAYMENT_METHOD]: {
    order: StepOrder.PAYMENT_METHOD,
    values: { paymentMethod: null },
    subSteps: [],
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

export const saveFormValues = <
  T extends Exclude<
    FormScreens,
    | 'COURIER_DELIVERY_DETAILS'
    | 'POST_DELIVERY_DETAILS'
    | 'CREDIT_CARD_DETAILS'
    | 'FORM_SUCCESS'
  >,
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: (typeof initialFormValues)[T]['values'],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
) => {};

const initialValue = {
  formValues: initialFormValues,
  onSaveFormValues: saveFormValues,
};

const WizardFormContext = createContext<typeof initialValue>(initialValue);

export default WizardFormContext;
