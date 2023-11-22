export type CourierDeliveryDetailsInitialValues = Record<string, never>;

export interface CourierDeliveryDetailsSubmitValues {
  date: null;
  time: string;
  city: string;
  street: string;
  house: string;
  flat: null;
  intercom: null;
  hasElevator: boolean;
}
