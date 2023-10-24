import { useContext } from 'react';
import { Form } from 'react-final-form';
import Button from '@mui/material/Button';
import { TextField } from 'mui-rff';
import FormScreens from 'constants/formScreens';
import CardNumberField from 'components/CardNumberField';
import WizardFormContext, {
  InitialFormValuesType,
} from 'contexts/WizardFormContext';
import {
  composeValidators,
  validateDigitsNumber,
  validateIsRequired,
} from 'utils/validation';

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
                validateDigitsNumber(16, 'credit card number'),
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
                validateDigitsNumber(3, 'CVV code'),
              ),
            }}
            label='CVV Code'
            name='cvvCode'
            placeholder='Enter CVV code'
            sx={{ mb: 2 }}
            type='password'
          />
          <TextField
            fieldProps={{ validate: validateIsRequired }}
            label='Expiration Date'
            name='expirationDate'
            placeholder='Enter expiration date'
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
