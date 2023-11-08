import { createContext } from 'react';
import FormScreens from 'constants/formScreens';

// type InitialFormValues = {
//   [key in FormScreens]: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phoneNumbers: string[];
//   };
//   [key in FormScreens]: {
//     deliveryMode: null;
//   };
//   [key in FormScreens]: {
//     date: null;
//     time: string;
//     city: string;
//     street: string;
//     house: string;
//     flat: null;
//     intercom: null;
//     hasElevator: boolean;
//   };
//   [key in FormScreens]: {
//     postCompany: null;
//     postOffice: null;
//   };
//   [key in FormScreens]: {
//     paymentMethod: null;
//   };
//   [key in FormScreens]: {
//     cardNumber: null;
//     cvvCode: null;
//     expirationDate: string;
//   };
//   [key in FormScreens]: {
//     isAgree: boolean;
//   };
// };

export const initialFormValues = {
  [FormScreens.PERSONAL_DETAILS]: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumbers: [''],
  },
  [FormScreens.DELIVERY_MODE]: {
    deliveryMode: null,
  },
  [FormScreens.COURIER_DELIVERY_DETAILS]: {
    date: null,
    time: '',
    city: '',
    street: '',
    house: '',
    flat: null,
    intercom: null,
    hasElevator: false,
  },
  [FormScreens.POST_DELIVERY_DETAILS]: {
    postCompany: null,
    postOffice: null,
  },
  [FormScreens.PAYMENT_METHOD]: {
    paymentMethod: null,
  },
  [FormScreens.CREDIT_CARD_DETAILS]: {
    cardNumber: null,
    cvvCode: null,
    expirationDate: '',
  },
  [FormScreens.FORM_SUBMISSION]: {
    isAgree: false,
  },
};

export type InitialFormValuesType = typeof initialFormValues;

export const saveFormValues = <T extends Exclude<FormScreens, 'FORM_SUCCESS'>>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: (typeof initialFormValues)[T],
) => {};

const initialValue = {
  formValues: initialFormValues,
  onSaveFormValues: saveFormValues,
};

const WizardFormContext = createContext<typeof initialValue>(initialValue);

export default WizardFormContext;
