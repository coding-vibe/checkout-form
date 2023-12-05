import DeliveryModes from 'constants/deliveryModes';

interface DeliveryModeSubmitValues {
  deliveryType: DeliveryModes;
}

export default DeliveryModeSubmitValues;

export const isDeliveryModePayload = (
  values: unknown,
): values is { deliveryType: DeliveryModes } =>
  !!values &&
  typeof values === 'object' &&
  'deliveryType' in values &&
  (values.deliveryType === 'COURIER' || values.deliveryType === 'POST_OFFICE');
