import { createContext } from 'react';
import FormScreens from 'constants/formScreens';
import StepOrder from 'constants/stepOrder';
import CourierDeliveryDetailsSubmitValues from 'types/courierDeliveryDetails';
import CreditCardDetailsSubmitValues from 'types/creditCardDetails';
import DeliveryModeSubmitValues from 'types/deliveryMode';
import FormScreenValueType from 'types/formScreenValue';
import FormSubmissionSubmitValues from 'types/formSubmission';
import PaymentMethodSubmitValues from 'types/paymentMethod';
import {
  PersonalDetailsInitialValues,
  PersonalDetailsSubmitValues,
} from 'types/personalDetails';
import PostDeliveryDetailsSubmitValues from 'types/postDeliveryDetails';

export interface FormValuesType {
  [FormScreens.PERSONAL_DETAILS]: {
    order: StepOrder.PERSONAL_DETAILS;
    values: FormScreenValueType<
      PersonalDetailsSubmitValues,
      PersonalDetailsInitialValues
    >;
  };
  [FormScreens.DELIVERY_MODE]: {
    order: StepOrder.DELIVERY_MODE;
    values: FormScreenValueType<DeliveryModeSubmitValues>;
    subStep:
      | FormScreenValueType<CourierDeliveryDetailsSubmitValues>
      | FormScreenValueType<PostDeliveryDetailsSubmitValues>
      | null;
  };
  [FormScreens.PAYMENT_METHOD]: {
    order: StepOrder.PAYMENT_METHOD;
    values: FormScreenValueType<PaymentMethodSubmitValues>;
    subStep: FormScreenValueType<CreditCardDetailsSubmitValues> | null;
  };
  [FormScreens.FORM_SUBMISSION]: {
    order: StepOrder.FORM_SUBMISSION;
    values: FormScreenValueType<FormSubmissionSubmitValues>;
  };
  [FormScreens.FORM_SUCCESS]: {
    order: StepOrder.FORM_SUCCESS;
  };
}

export const FormValues: FormValuesType = {
  [FormScreens.PERSONAL_DETAILS]: {
    order: StepOrder.PERSONAL_DETAILS,
    values: { phoneNumbers: [''] },
  },
  [FormScreens.DELIVERY_MODE]: {
    order: StepOrder.DELIVERY_MODE,
    values: {},
    subStep: null,
  },
  [FormScreens.PAYMENT_METHOD]: {
    order: StepOrder.PAYMENT_METHOD,
    values: {},
    subStep: null,
  },
  [FormScreens.FORM_SUBMISSION]: {
    order: StepOrder.FORM_SUBMISSION,
    values: {},
  },
  [FormScreens.FORM_SUCCESS]: {
    order: StepOrder.FORM_SUCCESS,
  },
};

export type Screens = Exclude<FormScreens, 'FORM_SUCCESS'>;

export type ParentScreens =
  | FormScreens.DELIVERY_MODE
  | FormScreens.PAYMENT_METHOD;

export type SubmitFormValuesType<Screen> =
  Screen extends FormScreens.COURIER_DELIVERY_DETAILS
    ? CourierDeliveryDetailsSubmitValues
    : Screen extends FormScreens.CREDIT_CARD_DETAILS
    ? CreditCardDetailsSubmitValues
    : Screen extends FormScreens.DELIVERY_MODE
    ? DeliveryModeSubmitValues
    : Screen extends FormScreens.FORM_SUBMISSION
    ? FormSubmissionSubmitValues
    : Screen extends FormScreens.PAYMENT_METHOD
    ? PaymentMethodSubmitValues
    : Screen extends FormScreens.PERSONAL_DETAILS
    ? PersonalDetailsSubmitValues
    : Screen extends FormScreens.POST_DELIVERY_DETAILS
    ? PostDeliveryDetailsSubmitValues
    : never;

export const saveFormValues = <T extends Screens, U extends ParentScreens>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: SubmitFormValuesType<T>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ___?: U | null,
) => {};

const initialValue = {
  formValues: FormValues,
  onSaveFormValues: saveFormValues,
};

const WizardFormContext = createContext<typeof initialValue>(initialValue);

export default WizardFormContext;
