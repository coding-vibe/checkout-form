import { Form } from 'react-final-form';
import Typography from '@mui/material/Typography';
import StepNavigator from 'components/StepNavigator';
import CardExpiryField from 'components/CardExpiryField';
import CardNumberField from 'components/CardNumberField';
import CVVCodeField from 'components/CVVCodeField';
import withFormHandler from 'components/withFormScreenProps';
import CreditCardDetailsValues from 'types/creditCardDetails';
import StepComponentProps from 'types/formScreen';
import {
  composeValidators,
  validateDigitsCount,
  validateIsFutureDate,
  validateIsRequired,
} from 'utils/validation';
import * as classes from './styles';

const CARD_NUMBER_LENGTH = 16;
const CVV_CODE_LENGTH = 3;

type Props = StepComponentProps<CreditCardDetailsValues>;

function CreditCardDetailsScreen({ initialValues, onSubmit, screen }: Props) {
  return (
    <div>
      <Typography
        css={classes.title}
        component='h1'
        variant='h5'>
        Provide {screen.replace(/_/g, ' ').toLowerCase()}
      </Typography>
      <Form<CreditCardDetailsValues>
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form
            id={screen}
            onSubmit={handleSubmit}>
            <div css={classes.fields}>
              <CardNumberField
                css={classes.field}
                fieldProps={{
                  validate: composeValidators(
                    validateIsRequired,
                    validateDigitsCount(
                      CARD_NUMBER_LENGTH,
                      'credit card number',
                    ),
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
            <StepNavigator />
          </form>
        )}
      />
    </div>
  );
}

export default withFormHandler<CreditCardDetailsValues>(
  CreditCardDetailsScreen,
);
