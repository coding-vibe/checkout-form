import { createContext } from 'react';
import FormScreens from 'constants/formScreens';
import StepOrder from 'constants/stepOrder';
import { FormValuesType, ParentScreens, Screens } from 'types/formTypes';

export const InitialFormValues: FormValuesType = {
  [FormScreens.PERSONAL_DETAILS]: {
    isCompleted: false,
    order: StepOrder.PERSONAL_DETAILS,
    values: { phoneNumbers: [''] },
  },
  [FormScreens.DELIVERY_MODE]: {
    isCompleted: false,
    order: StepOrder.DELIVERY_MODE,
  },
  [FormScreens.PAYMENT_METHOD]: {
    isCompleted: false,
    order: StepOrder.PAYMENT_METHOD,
  },
  [FormScreens.FORM_SUBMISSION]: {
    isCompleted: false,
    order: StepOrder.FORM_SUBMISSION,
  },
  [FormScreens.FORM_SUCCESS]: {
    isCompleted: false,
    order: StepOrder.FORM_SUCCESS,
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const saveFormValues = (_: FormValuesType) => {};

export const saveScreenValues = <
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
  firstUncompletedStep: FormScreens.PERSONAL_DETAILS,
  formValues: InitialFormValues,
  onSaveFormValues: saveFormValues,
  onSaveScreenValues: saveScreenValues,
};

const WizardFormContext = createContext<typeof initialValue>(initialValue);

export default WizardFormContext;
