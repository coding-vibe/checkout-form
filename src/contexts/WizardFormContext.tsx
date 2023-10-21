import { createContext } from 'react';
import FormScreens from 'constants/formScreens';

// eslint-disable-next-line react-refresh/only-export-components
export const initialFormValues = {
  [FormScreens.PERSONAL_DETAILS]: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumbers: [''],
  },
  [FormScreens.DELIVERY_MODE]: {
    deliveryMode: null,
  },
};

const initialValue = {
  formValues: initialFormValues,
  onSelectFormValues: <T extends FormScreens>(
    _: T,
    __: (typeof initialFormValues)[T],
  ) => {},
};

const WizardFormContext = createContext<typeof initialValue>(initialValue);

export default WizardFormContext;
