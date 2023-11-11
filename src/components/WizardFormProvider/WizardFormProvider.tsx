import { ReactNode, useState } from 'react';
import WizardFormContext, {
  initialFormValues,
  saveFormValues,
} from 'contexts/WizardFormContext';

interface Props {
  children: ReactNode;
}

export default function WizardFormProvider({ children }: Props) {
  const [formValues, handleSaveFormValues] =
    useState<typeof initialFormValues>(initialFormValues);

  const onSaveFormValues: typeof saveFormValues = (screen, values) => {
    handleSaveFormValues((prevFormValues) => ({
      ...prevFormValues,
      [screen]: {
        ...prevFormValues[screen],
        values,
      },
    }));
  };

  return (
    <WizardFormContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        formValues,
        onSaveFormValues,
      }}>
      {children}
    </WizardFormContext.Provider>
  );
}
