import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import { Select } from 'mui-rff';
import withFormHandler from 'components/withFormHandler';
import FormScreens from 'constants/formScreens';
import PAYMENT_METHODS_OPTIONS from 'constants/paymentMethodOptions';
import FormScreen from 'types/formScreen';
import PaymentMethodSubmitValues from 'types/paymentMethod';
import { validateIsRequired } from 'utils/validation';

interface Props<SubmitValues, InitialValues>
  extends FormScreen<SubmitValues, InitialValues> {}

function PaymentMethodScreen<SubmitValues, InitialValues>({
  initialValues,
  onSubmit,
  screen,
}: Props<SubmitValues, InitialValues>) {
  return (
    <Form<SubmitValues, SubmitValues | InitialValues | undefined>
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

export default withFormHandler<
  PaymentMethodSubmitValues,
  Record<string, never>
>({
  screen: FormScreens.PAYMENT_METHOD,
})(PaymentMethodScreen);
