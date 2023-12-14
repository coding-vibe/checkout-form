import PaymentMethods from 'constants/paymentMethods';

export interface PaymentMethodSubmitValues {
  paymentMethod: PaymentMethods;
}

export const isPaymentMethodPayload = (
  values: unknown,
): values is { paymentMethod: PaymentMethods } =>
  !!values &&
  typeof values === 'object' &&
  'paymentMethod' in values &&
  (values.paymentMethod === PaymentMethods.CASH ||
    values.paymentMethod === PaymentMethods.CREDIT_CARD);
