import DeliveryModes from 'constants/deliveryModes';

export type DeliveryModeInitialValues = Record<string, never>;

export interface DeliveryModeSubmitValues {
  deliveryType: DeliveryModes;
}
