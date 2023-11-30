import DeliveryModes from 'constants/deliveryModes';
import FormScreens from 'constants/formScreens';
import PaymentMethods from 'constants/paymentMethods';
import StepOrder from 'constants/stepOrder';

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

export type ParentScreens =
  | FormScreens.DELIVERY_MODE
  | FormScreens.PAYMENT_METHOD;

export type Screens = Exclude<FormScreens, 'FORM_SUCCESS'>;
