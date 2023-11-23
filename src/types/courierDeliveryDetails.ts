interface CourierDeliveryDetailsSubmitValues {
  date: string;
  time: Date;
  city: string;
  street: string;
  house: string;
  flat?: number;
  intercom?: number;
  hasElevator: boolean;
}

export default CourierDeliveryDetailsSubmitValues;
