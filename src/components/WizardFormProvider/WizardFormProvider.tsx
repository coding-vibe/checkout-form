import { ReactNode, useState } from 'react';
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    handleSaveFormValues((prevFormValues) => {
      if (parent) {
        return {
          ...prevFormValues,
          [parent]: {
            ...prevFormValues[parent],
            subStep: {
              ...prevFormValues[parent].subStep,
              isCompleted: true,
              values: screenValues,
            },
          },
        };
      }

      if (checkScreenIsNotSubStep(screen, parent)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (screen === FormScreens.DELIVERY_MODE && screenValues.deliveryType) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const { deliveryType } = screenValues;

          const getSubStep = (): {
            id:
              | FormScreens.COURIER_DELIVERY_DETAILS
              | FormScreens.POST_DELIVERY_DETAILS;
            isCompleted: boolean;
          } => {
            if (deliveryType === DeliveryModes.COURIER)
              return {
                id: FormScreens.COURIER_DELIVERY_DETAILS,
                isCompleted: false,
              };

            if (deliveryType === DeliveryModes.POST_OFFICE) {
              return {
                id: FormScreens.POST_DELIVERY_DETAILS,
                isCompleted: false,
              };
            }

            throw Error('Unknown delivery type submitted');
          };

          return {
            ...prevFormValues,
            [FormScreens.DELIVERY_MODE]: {
              ...prevFormValues[FormScreens.DELIVERY_MODE],
              isCompleted: true,
              subStep: getSubStep(),
              values: screenValues,
            },
          };
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (screenValues.paymentMethod === PaymentMethods.CREDIT_CARD) {
          return {
            ...prevFormValues,
            [FormScreens.PAYMENT_METHOD]: {
              ...prevFormValues[FormScreens.PAYMENT_METHOD],
              isCompleted: true,
              subStep: {
                id: FormScreens.CREDIT_CARD_DETAILS,
                isCompleted: false,
              },
              values: screenValues,
            },
          };
        }
      }

      return {
        ...prevFormValues,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        [screen]: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ...prevFormValues[screen],
          isCompleted: true,
          values: screenValues,
        },
      };
    });
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
