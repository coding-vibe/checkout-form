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
    values: { deliveryType: null },
    subStep: null,
  },
  [FormScreens.PAYMENT_METHOD]: {
    order: StepOrder.PAYMENT_METHOD,
    values: { paymentMethod: null },
    subStep: null,
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

export type Screens = Exclude<FormScreens, 'FORM_SUCCESS'>;

type PickEnum<T, K extends T> = {
  [P in keyof K]: P extends K ? P : never;
};

export type ParentScreens = PickEnum<
  FormScreens,
  FormScreens.DELIVERY_MODE | FormScreens.PAYMENT_METHOD
>;

export const saveFormValues = <T extends Screens, U extends ParentScreens>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: T,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: InitialFormValuesType[T]['values'] | object,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ___?: U | null,
) => {};

const initialValue = {
  formValues: initialFormValues,
  onSaveFormValues: saveFormValues,
};

const WizardFormContext = createContext<typeof initialValue>(initialValue);

export default WizardFormContext;
