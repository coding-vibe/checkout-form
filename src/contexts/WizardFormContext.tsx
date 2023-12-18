import { createContext } from 'react';
import FormScreens from 'constants/formScreens';
import { Step } from 'types/step';
import routes from 'constants/routes';

export const initialValues = [
  {
    id: FormScreens.PERSONAL_DETAILS,
    isCompleted: false,
    values: { phoneNumbers: [''] },
    url: routes.PERSONAL_DETAILS,
  },
  {
    id: FormScreens.DELIVERY_MODE,
    isCompleted: false,
    url: routes.DELIVERY_MODE,
  },
  {
    id: FormScreens.PAYMENT_METHOD,
    isCompleted: false,
    url: routes.PAYMENT_METHOD,
  },
  {
    id: FormScreens.FORM_SUBMISSION,
    isCompleted: false,
    url: routes.FORM_SUBMISSION,
  },
  {
    id: FormScreens.FORM_SUCCESS,
    isCompleted: false,
    url: routes.FORM_SUCCESS,
  },
];

const initialContextValue = {
  values: initialValues,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSaveFormValues: (_: Step[]) => {},
  onSaveScreenValues: <Values extends object = object>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: Values,
  ) => {},
  firstUncompletedStep: undefined,
  currentStep: undefined,
  isInitialized: false,
  onInitializationComplete: () => {},
};

export interface ContextType {
  values: Step[];
  firstUncompletedStep?: Step;
  currentStep?: Step;
  onSaveFormValues: typeof initialContextValue.onSaveFormValues;
  onSaveScreenValues: typeof initialContextValue.onSaveScreenValues;
  isInitialized: boolean;
  onInitializationComplete: () => void;
}

const WizardFormContext = createContext<ContextType>(initialContextValue);

export default WizardFormContext;
