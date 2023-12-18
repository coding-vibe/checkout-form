import { ReactNode, useMemo, useState, useCallback } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import FormScreens from 'constants/formScreens';
import DeliveryModes from 'constants/deliveryModes';
import PaymentMethods from 'constants/paymentMethods';
import WizardFormContext, {
  initialValues,
  ContextType,
} from 'contexts/WizardFormContext';
import { Step } from 'types/step';
import routes from 'constants/routes';

interface Props {
  children: ReactNode;
}

export default function WizardFormProvider({ children }: Props) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [values, handleSaveValues] = useState<Step[]>(initialValues);
  const { pathname } = useLocation();

  const firstUncompletedStep = values.find((step) => !step.isCompleted);
  const currentStep = values.find((step) => step.url === pathname);

  const handleInsertStep = useCallback(
    (stepList: Step[], position: number, step: Step): Step[] => [
      ...stepList.slice(0, position + 1),
      step,
      ...stepList.slice(position + 1),
    ],
    [],
  );

  const handleSaveScreen: ContextType['onSaveScreenValues'] = useCallback(
    (screenValues) => {
      if (!currentStep) {
        return;
      }

      handleSaveValues((prevFormValues) => {
        const updatedStepIndex = prevFormValues.indexOf(currentStep);

        const updatedValues = prevFormValues.map((step) =>
          step === currentStep
            ? {
                ...step,
                values: screenValues,
                isCompleted: true,
              }
            : step,
        );

        if (
          currentStep.id === FormScreens.DELIVERY_MODE &&
          'deliveryType' in screenValues
        ) {
          if (screenValues.deliveryType === DeliveryModes.COURIER) {
            const filteredSteps = updatedValues.filter(
              ({ id }) => id !== FormScreens.POST_DELIVERY_DETAILS,
            );

            return handleInsertStep(filteredSteps, updatedStepIndex, {
              id: FormScreens.COURIER_DELIVERY_DETAILS,
              isCompleted: false,
              url: routes.COURIER_DELIVERY_DETAILS,
            });
          }

          if (screenValues.deliveryType === DeliveryModes.POST_OFFICE) {
            const filteredSteps = updatedValues.filter(
              ({ id }) => id !== FormScreens.COURIER_DELIVERY_DETAILS,
            );

            return handleInsertStep(filteredSteps, updatedStepIndex, {
              id: FormScreens.POST_DELIVERY_DETAILS,
              isCompleted: false,
              url: routes.POST_DELIVERY_DETAILS,
            });
          }
        }

        if (
          currentStep.id === FormScreens.PAYMENT_METHOD &&
          'paymentMethod' in screenValues
        ) {
          if (screenValues.paymentMethod === PaymentMethods.CASH) {
            return updatedValues.filter(
              ({ id }) => id !== FormScreens.CREDIT_CARD_DETAILS,
            );
          }

          if (screenValues.paymentMethod === PaymentMethods.CREDIT_CARD) {
            return handleInsertStep(updatedValues, updatedStepIndex, {
              isCompleted: false,
              id: FormScreens.CREDIT_CARD_DETAILS,
              url: routes.CREDIT_CARD_DETAILS,
            });
          }
        }

        return updatedValues;
      });
    },
    [currentStep, handleInsertStep],
  );

  const handleMarkAsInitialized = useCallback(() => setIsInitialized(true), []);

  const providerValue = useMemo(
    () => ({
      firstUncompletedStep,
      values,
      onSaveFormValues: handleSaveValues,
      onSaveScreenValues: handleSaveScreen,
      currentStep,
      isInitialized,
      onInitializationComplete: handleMarkAsInitialized,
    }),
    [
      isInitialized,
      firstUncompletedStep,
      values,
      handleSaveScreen,
      currentStep,
      handleMarkAsInitialized,
    ],
  );

  if (
    isInitialized &&
    firstUncompletedStep &&
    ((currentStep &&
      currentStep !== firstUncompletedStep &&
      !currentStep.isCompleted) ||
      !currentStep)
  ) {
    return <Navigate to={firstUncompletedStep.url} />;
  }

  return (
    <WizardFormContext.Provider value={providerValue}>
      {children}
    </WizardFormContext.Provider>
  );
}
