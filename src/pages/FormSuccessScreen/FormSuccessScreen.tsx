import { useContext } from 'react';
import AwesomeIcon from '@mui/icons-material/AutoAwesome';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IMAGES from 'assets/images';
import WizardFormContext from 'contexts/WizardFormContext';
import * as classes from './styles';

export default function FormSuccessScreen() {
  const { formValues } = useContext(WizardFormContext);

  return (
    <div css={classes.wrap}>
      <img
        alt='rocket'
        height='400px'
        src={IMAGES.rocketImage}
        width='400px'
      />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <h1 css={classes.title}>Thank you&nbsp;</h1>
        <AwesomeIcon sx={{ fontSize: 40 }} />
      </Box>
      <span css={classes.mainText}>
        We have received your submission, and we will be in touch soon!
      </span>
      {formValues.PAYMENT_METHOD.paymentMethod === 'creditCard' ? (
        <span css={classes.text}>
          *&nbsp;In few seconds you will be redirected to the payment provider
          for the payment confirmation
        </span>
      ) : (
        <Button
          size='large'
          sx={{ ml: 1, width: 250 }}
          type='submit'
          variant='contained'>
          Keep buying
        </Button>
      )}
    </div>
  );
}
