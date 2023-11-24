import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import { Select } from 'mui-rff';
import withFormHandler from 'components/withFormScreenProps';
import FormScreens from 'constants/formScreens';
import PAYMENT_METHODS_OPTIONS from 'constants/paymentMethodOptions';
import FormScreenProps from 'types/formScreen';
import PaymentMethodSubmitValues from 'types/paymentMethod';
import { validateIsRequired } from 'utils/validation';

interface Props extends FormScreenProps<PaymentMethodSubmitValues> {}

function PaymentMethodScreen({ initialValues, onSubmit, screen }: Props) {
  return (
    <Form<PaymentMethodSubmitValues>
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
        </form>
      )}
    />
  );
}

export default withFormHandler({
  screen: FormScreens.PAYMENT_METHOD,
})(PaymentMethodScreen);
