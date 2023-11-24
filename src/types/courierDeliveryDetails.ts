interface CourierDeliveryDetailsSubmitValues {
  date: Date;
  time: string;
  city: string;
  street: string;
  house: string;
  flat?: number;
  intercom?: number;
  hasElevator: boolean;
}

export default CourierDeliveryDetailsSubmitValues;
