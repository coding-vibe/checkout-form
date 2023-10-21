import { createContext } from 'react';
import FormScreens from 'constants/formScreens';
import PersonalDetailsValues from 'types/personalDetailsValues';

// eslint-disable-next-line react-refresh/only-export-components
export const initialFormValues = {
  [FormScreens.PERSONAL_DETAILS]: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumbers: [''],
  },
  [FormScreens.DELIVERY_MODE]: {
    deliveryMode: '',
  },
};

const initialValue = {
  formValues: initialFormValues,
  onSelectFormValues: (_: FormScreens, __: PersonalDetailsValues) => {},
};

const WizardFormContext = createContext<typeof initialValue>(initialValue);

export default WizardFormContext;
