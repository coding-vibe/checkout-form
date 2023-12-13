import PaymentMethods from 'constants/paymentMethods';

export interface PaymentMethodSubmitValues {
  paymentMethod: PaymentMethods;
}

export default PaymentMethodSubmitValues;

export const isPaymentMethodPayload = (
  values: unknown,
): values is { paymentMethod: PaymentMethods } =>
  !!values &&
  typeof values === 'object' &&
  'paymentMethod' in values &&
  (values.paymentMethod === 'CASH' || values.paymentMethod === 'CREDIT_CARD');
