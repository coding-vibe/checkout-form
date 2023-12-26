import { useContext, useEffect } from 'react';
import upperCase from 'lodash/upperCase';
import AwesomeIcon from '@mui/icons-material/AutoAwesome';
import Typography from '@mui/material/Typography';
import FORM_STATE from 'constants/formState';
import FormScreens from 'constants/formScreens';
import PaymentMethods from 'constants/paymentMethods';
import WizardFormContext from 'contexts/WizardFormContext';
import * as classes from './styles';

export default function FormSubmissionSuccessScreen() {
  const { values } = useContext(WizardFormContext);

  const isCreditCardSelected = values.some(
    ({ id, values }) =>
      values &&
      id === FormScreens.PAYMENT_METHOD &&
      'paymentMethod' in values &&
      values.paymentMethod === PaymentMethods.CREDIT_CARD,
  );

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
        <Typography
          css={classes.title}
          component='h1'
          variant='h1'>
          {upperCase('Thank you')}&nbsp;
        </Typography>
        <AwesomeIcon css={classes.icon} />
      </div>
      <span css={classes.mainText}>
        We have received your submission, and we will be in touch soon!
      </span>
      {isCreditCardSelected && (
        <span css={classes.text}>
          *&nbsp;In few seconds you will be redirected to the payment
          confirmation
        </span>
      )}
    </div>
  );
}
