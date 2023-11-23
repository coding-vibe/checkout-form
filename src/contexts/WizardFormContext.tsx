import { createContext } from 'react';
import FormScreens from 'constants/formScreens';
import StepOrder from 'constants/stepOrder';
import CourierDeliveryDetailsSubmit from 'types/courierDeliveryDetails';
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
      | FormScreenValueType<CourierDeliveryDetailsSubmit>
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

export const saveFormValues = <T extends Screens, U extends ParentScreens>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: T,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: FormValuesType[T]['values'] | object,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ___?: U | null,
) => {};

const initialValue = {
  formValues: FormValues,
  onSaveFormValues: saveFormValues,
};

const WizardFormContext = createContext<typeof initialValue>(initialValue);

export default WizardFormContext;
