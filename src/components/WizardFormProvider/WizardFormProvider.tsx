import { ReactNode, useEffect, useState } from 'react';
import WizardFormContext, {
  InitialFormValues,
  saveFormValues,
} from 'contexts/WizardFormContext';
import FormScreens from 'constants/formScreens';
import DeliveryModes from 'constants/deliveryModes';
import PaymentMethods from 'constants/paymentMethods';
import { FormValuesType } from 'types/formTypes';
import checkScreenIsNotSubStep from 'utils/checkScreenIsNotSubStep';

interface Props {
  children: ReactNode;
}

export default function WizardFormProvider({ children }: Props) {
  const [formValues, handleSaveFormValues] =
    useState<FormValuesType>(InitialFormValues);

  const onSaveFormValues: typeof saveFormValues = (
    screen,
    screenValues,
    parent,
  ) => {
    handleSaveFormValues((prevFormValues) => {
      if (parent) {
        return {
          ...prevFormValues,
          [parent]: {
            ...prevFormValues[parent],
            subStep: {
              id: screen,
              values: screenValues,
            },
          },
        };
      }

      if (checkScreenIsNotSubStep(screen, parent)) {
        return {
          ...prevFormValues,
          [screen]: {
            ...prevFormValues[screen],
            values: screenValues,
          },
        };
      }

      throw new Error(
        `Cannot submit values form screen ${screen} without specified parent`,
      );
    });
  };

  useEffect(() => {
    handleSaveFormValues((prevFormValues) => {
      if (!formValues.DELIVERY_MODE.values?.deliveryType) {
        return prevFormValues;
      }

      const { deliveryType } = formValues.DELIVERY_MODE.values;

      const getSubStep = (): {
        id:
          | FormScreens.POST_DELIVERY_DETAILS
          | FormScreens.COURIER_DELIVERY_DETAILS;
      } => {
        if (deliveryType === DeliveryModes.COURIER)
          return {
            id: FormScreens.COURIER_DELIVERY_DETAILS,
          };

        if (deliveryType === DeliveryModes.POST_OFFICE) {
          return {
            id: FormScreens.POST_DELIVERY_DETAILS,
          };
        }

        throw Error('Unknown delivery type submitted');
      };

      return {
        ...prevFormValues,
        [FormScreens.DELIVERY_MODE]: {
          ...prevFormValues[FormScreens.DELIVERY_MODE],
          subStep: getSubStep(),
        },
      };
    });
  }, [formValues.DELIVERY_MODE.values]);

  useEffect(() => {
    if (
      formValues.PAYMENT_METHOD?.values?.paymentMethod ===
      PaymentMethods.CREDIT_CARD
    ) {
      handleSaveFormValues((prevFormValues) => ({
        ...prevFormValues,
        [FormScreens.PAYMENT_METHOD]: {
          ...prevFormValues[FormScreens.PAYMENT_METHOD],
          subStep: {
            id: FormScreens.CREDIT_CARD_DETAILS,
          },
        },
      }));
    }
  }, [formValues.PAYMENT_METHOD.values]);

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
