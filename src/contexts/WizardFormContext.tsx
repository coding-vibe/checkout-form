import { createContext } from 'react';
import FormScreens from 'constants/formScreens';
import StepOrder from 'constants/stepOrder';
import DeliveryModes from 'constants/deliveryModes';
import PaymentMethods from 'constants/paymentMethods';

export interface FormValuesType {
  [FormScreens.PERSONAL_DETAILS]: {
    order: StepOrder.PERSONAL_DETAILS;
    values: { phoneNumbers: string[] };
  };
  [FormScreens.DELIVERY_MODE]: {
    order: StepOrder.DELIVERY_MODE;
    values?: { deliveryType: DeliveryModes };
    subStep?:
      | { id: FormScreens.POST_DELIVERY_DETAILS; values?: object }
      | { id: FormScreens.COURIER_DELIVERY_DETAILS; values?: object };
  };
  [FormScreens.PAYMENT_METHOD]: {
    order: StepOrder.PAYMENT_METHOD;
    values?: { paymentMethod: PaymentMethods };
    subStep?: { id: FormScreens.CREDIT_CARD_DETAILS; values?: object };
  };
  [FormScreens.FORM_SUBMISSION]: {
    order: StepOrder.FORM_SUBMISSION;
    values?: object;
  };
  [FormScreens.FORM_SUCCESS]: {
    order: StepOrder.FORM_SUCCESS;
  };
}

export const InitialFormValues: FormValuesType = {
  [FormScreens.PERSONAL_DETAILS]: {
    order: StepOrder.PERSONAL_DETAILS,
    values: { phoneNumbers: [''] },
  },
  [FormScreens.DELIVERY_MODE]: {
    order: StepOrder.DELIVERY_MODE,
  },
  [FormScreens.PAYMENT_METHOD]: {
    order: StepOrder.PAYMENT_METHOD,
  },
  [FormScreens.FORM_SUBMISSION]: {
    order: StepOrder.FORM_SUBMISSION,
  },
  [FormScreens.FORM_SUCCESS]: {
    order: StepOrder.FORM_SUCCESS,
  },
};

export type Screens = Exclude<FormScreens, 'FORM_SUCCESS'>;

export type ParentScreens =
  | FormScreens.DELIVERY_MODE
  | FormScreens.PAYMENT_METHOD;

export const saveFormValues = <
  Screen extends Screens,
  ParentScreen extends ParentScreens | undefined,
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: Screen,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: object,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ___?: ParentScreen,
) => {};

const initialValue = {
  formValues: InitialFormValues,
  onSaveFormValues: saveFormValues,
};

const WizardFormContext = createContext<typeof initialValue>(initialValue);

export default WizardFormContext;
