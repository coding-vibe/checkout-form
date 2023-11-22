export type CreditCardDetailsInitialValues = Record<string, never>;

export interface CreditCardDetailsSubmitValues {
  cardNumber: null;
  cvvCode: null;
  expirationDate: string;
}
