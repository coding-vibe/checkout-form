import { ReactNode, useState } from 'react';
import FormScreens from 'constants/formScreens';
import WizardFormContext, {
  initialFormValues,
} from 'contexts/WizardFormContext';

interface Props {
  children: ReactNode;
}

export default function WizardFormProvider({ children }: Props) {
  const [formValues, setFormValues] =
    useState<typeof initialFormValues>(initialFormValues);

  const onSelectFormValues = <T extends FormScreens>(
    screen: T,
    values: (typeof initialFormValues)[T],
  ) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [screen]: values,
    }));
  };

  return (
    <WizardFormContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        formValues,
        onSelectFormValues,
      }}>
      {children}
    </WizardFormContext.Provider>
  );
}
