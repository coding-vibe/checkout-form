import FormScreens from 'constants/formScreens';
import { ParentScreens, Screens } from 'contexts/WizardFormContext';

const checkScreenIsNotSubStep = (
  screen: Screens,
  parent?: ParentScreens,
): screen is
  | FormScreens.PERSONAL_DETAILS
  | FormScreens.DELIVERY_MODE
  | FormScreens.PAYMENT_METHOD
  | FormScreens.FORM_SUBMISSION =>
  !!(
    !parent &&
    screen !== FormScreens.COURIER_DELIVERY_DETAILS &&
    screen !== FormScreens.CREDIT_CARD_DETAILS &&
    screen !== FormScreens.POST_DELIVERY_DETAILS
  );

export default checkScreenIsNotSubStep;
