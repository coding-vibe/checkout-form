import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import { Select } from 'mui-rff';
import StepNavigator from 'components/StepNavigator';
import withFormHandler from 'components/withFormScreenProps';
import PAYMENT_METHODS_OPTIONS from 'constants/paymentMethodOptions';
import StepComponentProps from 'types/formScreen';
import PaymentMethodValues from 'types/paymentMethod';
import { validateIsRequired } from 'utils/validation';
import * as classes from './styles';

type Props = StepComponentProps<PaymentMethodValues>;

function PaymentMethodScreen({ initialValues, onSubmit, screen }: Props) {
  return (
    <div>
      <h2 css={classes.title}>Choose {screen.toLocaleLowerCase()}</h2>
      <Form<PaymentMethodValues>
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form
            id={screen}
            onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Select
                data={PAYMENT_METHODS_OPTIONS}
                fieldProps={{ validate: validateIsRequired }}
                label='Payment Method'
                name='paymentMethod'
              />
            </Box>
            <StepNavigator />
          </form>
        )}
      />
    </div>
  );
}

export default withFormHandler<PaymentMethodValues>(PaymentMethodScreen);
