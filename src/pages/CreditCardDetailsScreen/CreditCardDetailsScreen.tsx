import { useContext } from 'react';
import { Form } from 'react-final-form';
import Button from '@mui/material/Button';
import CardExpiryField from 'components/CardExpiryField';
import CardNumberField from 'components/CardNumberField';
import CVVCodeField from 'components/CVVCodeField';
import FormScreens from 'constants/formScreens';
import WizardFormContext from 'contexts/WizardFormContext';
import {
  composeValidators,
  validateDigitsCount,
  validateIsFutureDate,
  validateIsRequired,
} from 'utils/validation';
import * as classes from './styles';

const CARD_NUMBER_LENGTH = 16;
const CVV_CODE_LENGTH = 3;

type CreditCardDetailsType = {
  cardNumber: null;
  cvvCode: null;
  expirationDate: string;
};

export default function CreditCardDetailsScreen() {
  const { onSaveFormValues } = useContext(WizardFormContext);

  return (
    <Form<CreditCardDetailsType>
      onSubmit={(values) => {
        onSaveFormValues(
          FormScreens.CREDIT_CARD_DETAILS,
          values,
          FormScreens.PAYMENT_METHOD,
        );
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div css={classes.fields}>
            <CardNumberField
              css={classes.field}
              fieldProps={{
                validate: composeValidators(
                  validateIsRequired,
                  validateDigitsCount(CARD_NUMBER_LENGTH, 'credit card number'),
                ),
              }}
              label='Card Number'
              name='cardNumber'
              sx={{ mb: 5 }}
            />
            <div css={classes.wrap}>
              <CardExpiryField
                css={classes.field}
                fieldProps={{
                  validate: composeValidators(
                    validateIsRequired,
                    validateIsFutureDate,
                  ),
                }}
                label='Expiry Date'
                name='expiryDate'
              />
              <CVVCodeField
                css={classes.field}
                fieldProps={{
                  validate: composeValidators(
                    validateIsRequired,
                    validateDigitsCount(CVV_CODE_LENGTH, 'CVV code'),
                  ),
                }}
                label='CVV Code'
                name='cvvCode'
                placeholder='Enter CVV code'
              />
            </div>
          </div>
          <Button
            sx={{ ml: 1 }}
            type='submit'
            variant='contained'>
            Next step
          </Button>
        </form>
      )}
    />
  );
}
