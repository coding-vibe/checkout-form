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

  const isDeliveryModeValues = (
    values: unknown,
  ): values is { deliveryType: DeliveryModes } =>
    !!values && typeof values === 'object' && 'deliveryType' in values;

  const isPaymentMethodValues = (
    values: unknown,
  ): values is { paymentMethod: PaymentMethods } =>
    !!values && typeof values === 'object' && 'paymentMethod' in values;

  const onSaveFormValues: typeof saveFormValues = (
    screen,
    screenValues,
    parent,
  ) => {
    handleSaveFormValues((prevFormValues) => {
      if (checkScreenIsNotSubStep(screen, parent)) {
        if (
          screen === FormScreens.DELIVERY_MODE &&
          isDeliveryModeValues(screenValues) &&
          screenValues.deliveryType
        ) {
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

        if (
          screen === FormScreens.PAYMENT_METHOD &&
          isPaymentMethodValues(screenValues) &&
          screenValues.paymentMethod === PaymentMethods.CREDIT_CARD
        ) {
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

        return {
          ...prevFormValues,
          [screen]: {
            ...prevFormValues[screen],
            isCompleted: true,
            values: screenValues,
          },
        };
      }

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

      throw Error('Unknown step/substep submitted');
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
