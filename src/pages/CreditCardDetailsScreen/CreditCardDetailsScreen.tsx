import { useContext } from 'react';
import { Form } from 'react-final-form';
import Button from '@mui/material/Button';
import CardExpiryField from 'components/CardExpiryField';
import CardNumberField from 'components/CardNumberField';
import CVVCodeField from 'components/CVVCodeField';
import FormScreens from 'constants/formScreens';
import WizardFormContext, {
  InitialFormValuesType,
} from 'contexts/WizardFormContext';
import {
  composeValidators,
  validateDigitsCount,
  validateIsFutureDate,
  validateIsRequired,
} from 'utils/validation';
import * as classes from './styles';

const CARD_NUMBER_LENGTH = 16;
const CVV_CODE_LENGTH = 3;

type CreditCardDetailsType =
  InitialFormValuesType[FormScreens.CREDIT_CARD_DETAILS];

export default function CreditCardDetailsScreen() {
  const { onSaveFormValues } = useContext(WizardFormContext);

  return (
    <div css={classes.wrap}>
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
            <CVVCodeField
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
            />
            <CardExpiryField
              fieldProps={{
                validate: composeValidators(
                  validateIsRequired,
                  validateIsFutureDate,
                ),
              }}
              label='Expiry Date'
              name='expiryDate'
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
    </div>
  );
}
