import PaymentMethods from 'constants/paymentMethods';

export type PaymentMethodInitialValues = Record<string, never>;

export interface PaymentMethodSubmitValues {
  paymentMethod: PaymentMethods;
}
