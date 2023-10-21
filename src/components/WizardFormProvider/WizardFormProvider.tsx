import { ReactNode, useState } from 'react';
import FormScreens from 'constants/formScreens';
import WizardFormContext, {
  initialFormValues,
} from 'contexts/WizardFormContext';
import PersonalDetailsValues from 'types/personalDetailsValues';

interface Props {
  children: ReactNode;
}

export default function WizardFormProvider({ children }: Props) {
  const [formValues, setFormValues] =
    useState<typeof initialFormValues>(initialFormValues);

  const onSelectFormValues = (
    screenName: FormScreens,
    values: PersonalDetailsValues,
  ) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [screenName]: values,
    }));
  };
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const formDataStorage = {
    formValues,
    onSelectFormValues,
  };

  return (
    <WizardFormContext.Provider value={formDataStorage}>
      {children}
    </WizardFormContext.Provider>
  );
}
