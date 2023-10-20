import { ReactNode, useState } from 'react';
import FormScreens from 'constants/formScreens';
import initialContextValue from 'constants/initialContextValue';
import WizardFormContext from 'contexts/WizardFormContext';
import PersonalDetailsValues from 'types/personalDetailsValues';

interface Props {
  children: ReactNode;
}

interface FormValues {
  formValues: { [FormScreens.PERSONAL_DETAILS]: PersonalDetailsValues };
  setFormValues: (values: PersonalDetailsValues) => {
    [FormScreens.PERSONAL_DETAILS]: PersonalDetailsValues;
  };
}

export default function WizardFormProvider({ children }: Props) {
  const [formValues, setFormValues] = useState<FormValues>(initialContextValue);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const formDataStorage = {
    formValues,
    setFormValues,
  };

  return (
    <WizardFormContext.Provider value={formDataStorage}>
      {children}
    </WizardFormContext.Provider>
  );
}
