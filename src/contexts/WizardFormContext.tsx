import { createContext } from 'react';
import FormScreens from 'constants/formScreens';
import StepOrder from 'constants/stepOrder';
import { FormValuesType, ParentScreens, Screens } from 'types/formTypes';

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
