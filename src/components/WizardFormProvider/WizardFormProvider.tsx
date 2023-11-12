import { ReactNode, useEffect, useState } from 'react';
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

  const onSaveFormValues: typeof saveFormValues = (screen, screenValues) => {
    handleSaveFormValues((prevFormValues) => {
      const update = prevFormValues[screen].subSteps
        ? prevFormValues[screen].subSteps.map((substep) => {
            const { id } = substep;
            if (id === screen) {
              return { ...substep, values: screenValues };
            }
            substep;
          })
        : { screenValues };

      return {
        ...prevFormValues,
        [screen]: {
          ...prevFormValues[screen],
          update,
        },
      };
    });
  };

  useEffect(() => {}, [
    formValues.DELIVERY_MODE.values.deliveryMode,
    formValues.PAYMENT_METHOD.values.paymentMethod,
  ]);

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
