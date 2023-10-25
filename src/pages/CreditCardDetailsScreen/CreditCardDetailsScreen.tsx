import { useContext } from 'react';
import { Form } from 'react-final-form';
import Button from '@mui/material/Button';
import { TextField } from 'mui-rff';
import CardExpiredDateField from 'components/CardExpiredDateField';
import CardNumberField from 'components/CardNumberField';
import FormScreens from 'constants/formScreens';
import WizardFormContext, {
  InitialFormValuesType,
} from 'contexts/WizardFormContext';
import {
  composeValidators,
  validateDigitsCount,
  validateIsRequired,
} from 'utils/validation';

const CARD_NUMBER_LENGTH = 16;
const CVV_CODE_LENGTH = 3;

type CreditCardDetailsType =
  InitialFormValuesType[FormScreens.CREDIT_CARD_DETAILS];

export default function CreditCardDetailsScreen() {
  const { onSaveFormValues } = useContext(WizardFormContext);

  return (
    <Form<CreditCardDetailsType>
      onSubmit={(values) => {
        onSaveFormValues(FormScreens.CREDIT_CARD_DETAILS, values);
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <CardNumberField
            fieldProps={{
              validate: composeValidators(
                validateIsRequired,
                validateDigitsCount(CARD_NUMBER_LENGTH, 'credit card number'),
              ),
            }}
            label='Card Number'
            name='cardNumber'
            sx={{ mb: 2 }}
          />
          <TextField
            fieldProps={{
              validate: composeValidators(
                validateIsRequired,
                validateDigitsCount(CVV_CODE_LENGTH, 'CVV code'),
              ),
            }}
            label='CVV Code'
            name='cvvCode'
            placeholder='Enter CVV code'
            sx={{ mb: 2 }}
            type='password'
          />
          <CardExpiredDateField
            fieldProps={{ validate: validateIsRequired }}
            label='Expiration Date'
            name='expirationDate'
            sx={{ mb: 2 }}
          />
          <Button
            type='submit'
            variant='contained'>
            Next step
          </Button>
        </form>
      )}
    />
  );
}
