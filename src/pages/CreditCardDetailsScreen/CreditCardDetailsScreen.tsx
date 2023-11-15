import { Form } from 'react-final-form';
import CardExpiryField from 'components/CardExpiryField';
import CardNumberField from 'components/CardNumberField';
import CVVCodeField from 'components/CVVCodeField';
import withFormHandler from 'components/withFormHandler';
import FormScreens from 'constants/formScreens';
import {
  composeValidators,
  validateDigitsCount,
  validateIsFutureDate,
  validateIsRequired,
} from 'utils/validation';
import * as classes from './styles';

const CARD_NUMBER_LENGTH = 16;
const CVV_CODE_LENGTH = 3;

interface CreditCardDetailsType {
  cardNumber: null;
  cvvCode: null;
  expirationDate: string;
}

interface Props {
  initialValues: CreditCardDetailsType;
  onSubmit: (values: CreditCardDetailsType) => void;
  screen: FormScreens;
}

function CreditCardDetailsScreen({ initialValues, onSubmit, screen }: Props) {
  return (
    <Form<CreditCardDetailsType>
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
        </form>
      )}
    />
  );
}

export default withFormHandler({
  screen: FormScreens.CREDIT_CARD_DETAILS,
  parentScreen: FormScreens.PAYMENT_METHOD,
})(CreditCardDetailsScreen);
