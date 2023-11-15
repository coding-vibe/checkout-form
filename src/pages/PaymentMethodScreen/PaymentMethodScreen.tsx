import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import { Select } from 'mui-rff';
import withFormHandler from 'components/FormHandler';
import FormScreens from 'constants/formScreens';
import PAYMENT_METHODS_OPTIONS from 'constants/paymentMethodOptions';
import { InitialFormValuesType } from 'contexts/WizardFormContext';
import { validateIsRequired } from 'utils/validation';

type PaymentMethodType =
  InitialFormValuesType[FormScreens.PAYMENT_METHOD]['values'];

interface Props {
  initialValues: PaymentMethodType;
  onSubmit: (values: PaymentMethodType) => void;
  screen: FormScreens;
}

function PaymentMethodScreen({ initialValues, onSubmit, screen }: Props) {
  return (
    <Form<PaymentMethodType>
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

const EnhancedPaymentMethodScreen = withFormHandler({
  screen: FormScreens.PAYMENT_METHOD,
})(PaymentMethodScreen);

export default EnhancedPaymentMethodScreen;
