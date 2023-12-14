import DeliveryModes from 'constants/deliveryModes';

export interface DeliveryModeSubmitValues {
  deliveryType: DeliveryModes;
}

export const isDeliveryModePayload = (
  values: unknown,
): values is { deliveryType: DeliveryModes } =>
  !!values &&
  typeof values === 'object' &&
  'deliveryType' in values &&
  (values.deliveryType === 'COURIER' || values.deliveryType === 'POST_OFFICE');
