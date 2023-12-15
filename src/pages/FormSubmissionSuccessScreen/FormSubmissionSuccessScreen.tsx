import { useContext, useEffect } from 'react';
import AwesomeIcon from '@mui/icons-material/AutoAwesome';
import FORM_STATE from 'constants/formState';
import PaymentMethods from 'constants/paymentMethods';
import WizardFormContext from 'contexts/WizardFormContext';
import * as classes from './styles';

export default function FormSubmissionSuccessScreen() {
  const { formValues } = useContext(WizardFormContext);

  useEffect(() => {
    localStorage.removeItem(FORM_STATE);
  }, []);

  return (
    <div css={classes.wrap}>
      <img
        alt='rocket'
        css={classes.image}
        src='/rocket.png'
      />
      <div css={classes.titleBox}>
        <h1 css={classes.title}>Thank you&nbsp;</h1>
        <AwesomeIcon css={classes.icon} />
      </div>
      <span css={classes.mainText}>
        We have received your submission, and we will be in touch soon!
      </span>
      {formValues.PAYMENT_METHOD.values?.paymentMethod ===
        PaymentMethods.CREDIT_CARD && (
        <span css={classes.text}>
          *&nbsp;In few seconds you will be redirected to the payment provider
          for the payment confirmation
        </span>
      )}
    </div>
  );
}
