import { ReactNode, useMemo, useState, useCallback } from 'react';
import FormScreens from 'constants/formScreens';
import DeliveryModes from 'constants/deliveryModes';
import PaymentMethods from 'constants/paymentMethods';
import WizardFormContext, {
  InitialFormValues,
  saveScreenValues,
} from 'contexts/WizardFormContext';
import Entries from 'types/entries';
import { FormValuesType } from 'types/formTypes';
import { isDeliveryModePayload } from 'types/deliveryMode';
import { isPaymentMethodPayload } from 'types/paymentMethod';
import checkScreenIsNotSubStep from 'utils/checkScreenIsNotSubStep';

interface Props {
  children: ReactNode;
}

export default function WizardFormProvider({ children }: Props) {
  const [formValues, handleSaveFormValues] =
    useState<FormValuesType>(InitialFormValues);

  const onSaveScreenValues: typeof saveScreenValues = useCallback(
    (screen, screenValues, parent) => {
      handleSaveFormValues((prevFormValues) => {
        if (checkScreenIsNotSubStep(screen, parent)) {
          if (
            screen === FormScreens.DELIVERY_MODE &&
            isDeliveryModePayload(screenValues) &&
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
            isPaymentMethodPayload(screenValues) &&
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
    },
    [],
  );

  const getFirstUncompletedStep = (): FormScreens => {
    // https://www.charpeni.com/blog/properly-type-object-keys-and-object-entries
    const formValuesEntries = Object.entries(
      formValues,
    ) as Entries<FormValuesType>;

    // eslint-disable-next-line no-restricted-syntax
    for (const [name, step] of formValuesEntries) {
      if (!step.isCompleted) {
        return name;
      }

      if ('subStep' in step && !!step.subStep && !step.subStep.isCompleted) {
        return step.subStep.id;
      }
    }

    return formValuesEntries[0][0];
  };

  const firstUncompletedStep = getFirstUncompletedStep();

  const contextValue = useMemo(
    () => ({
      firstUncompletedStep,
      formValues,
      onSaveFormValues: handleSaveFormValues,
      onSaveScreenValues,
    }),
    [firstUncompletedStep, formValues, onSaveScreenValues],
  );

  return (
    <WizardFormContext.Provider value={contextValue}>
      {children}
    </WizardFormContext.Provider>
  );
}
