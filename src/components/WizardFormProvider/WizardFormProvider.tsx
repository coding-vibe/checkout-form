import { ReactNode, useEffect, useState } from 'react';
import WizardFormContext, {
  initialFormValues,
  saveFormValues,
} from 'contexts/WizardFormContext';
import FormScreens from 'constants/formScreens';
import DeliveryModes from 'constants/deliveryModes';
import PaymentMethods from 'constants/paymentMethods';

interface Props {
  children: ReactNode;
}

export default function WizardFormProvider({ children }: Props) {
  const [formValues, handleSaveFormValues] =
    useState<typeof initialFormValues>(initialFormValues);

  const onSaveFormValues: typeof saveFormValues = (
    screen,
    screenValues,
    parent = null,
  ) => {
    handleSaveFormValues((prevFormValues) => {
      const updateScreenValues = parent
        ? {
            subStep: {
              id: screen,
              values: screenValues,
            },
          }
        : { values: screenValues };

      const updateFormValues = (screen: FormScreens) => ({
        ...prevFormValues,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        [screen]: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ...prevFormValues[screen],
          ...updateScreenValues,
        },
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return parent ? updateFormValues(parent) : updateFormValues(screen);
    });
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    handleSaveFormValues((prevFormValues) => {
      const update =
        formValues.DELIVERY_MODE.values.deliveryType === DeliveryModes.COURIER
          ? {
              subStep: {
                id: FormScreens.COURIER_DELIVERY_DETAILS,
                values: {
                  date: null,
                  time: '',
                  city: '',
                  street: '',
                  house: '',
                  flat: null,
                  intercom: null,
                  hasElevator: false,
                },
              },
            }
          : {
              subStep: {
                id: FormScreens.POST_DELIVERY_DETAILS,
                values: {
                  postCompany: null,
                  postOffice: null,
                },
              },
            };

      return {
        ...prevFormValues,
        [FormScreens.DELIVERY_MODE]: {
          ...prevFormValues.DELIVERY_MODE,
          ...update,
        },
      };
    });
  }, [formValues.DELIVERY_MODE.values]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    handleSaveFormValues((prevFormValues) => {
      const update = formValues.PAYMENT_METHOD.values.paymentMethod ===
        PaymentMethods.CREDIT_CARD && {
        subStep: {
          id: FormScreens.PAYMENT_METHOD,
          values: {
            cardNumber: null,
            cvvCode: null,
            expirationDate: '',
          },
        },
      };

      return {
        ...prevFormValues,
        [FormScreens.PAYMENT_METHOD]: {
          ...prevFormValues.PAYMENT_METHOD,
          ...update,
        },
      };
    });
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
