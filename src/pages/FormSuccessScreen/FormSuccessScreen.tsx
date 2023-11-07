import { useContext } from 'react';
import AwesomeIcon from '@mui/icons-material/AutoAwesome';
import Box from '@mui/material/Box';
import PaymentMethods from 'constants/paymentMethods';
import WizardFormContext from 'contexts/WizardFormContext';
import * as classes from './styles';

export default function FormSuccessScreen() {
  const { formValues } = useContext(WizardFormContext);

  return (
    <div css={classes.wrap}>
      <img
        alt='rocket'
        css={classes.image}
        src='/public/rocket.png'
      />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <h1 css={classes.title}>Thank you&nbsp;</h1>
        <AwesomeIcon sx={{ fontSize: 40 }} />
      </Box>
      <span css={classes.mainText}>
        We have received your submission, and we will be in touch soon!
      </span>
      {formValues.PAYMENT_METHOD.paymentMethod ===
      PaymentMethods.CREDIT_CARD ? (
        <span css={classes.text}>
          *&nbsp;In few seconds you will be redirected to the payment provider
          for the payment confirmation
        </span>
      ) : null}
    </div>
  );
}
