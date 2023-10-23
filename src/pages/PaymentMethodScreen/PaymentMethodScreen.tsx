import { useContext } from 'react';
import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Select } from 'mui-rff';
import FormScreens from 'constants/formScreens';
import PAYMENT_METHODS_OPTIONS from 'constants/paymentMethodOptions';
import WizardFormContext, {
  InitialFormValuesType,
} from 'contexts/WizardFormContext';
import { validateIsRequired } from 'utils/validation';

type PaymentMethodType = InitialFormValuesType[FormScreens.PAYMENT_METHOD];

export default function PaymentMethodScreen() {
  const { onSaveFormValues } = useContext(WizardFormContext);

  return (
    <Form<PaymentMethodType>
      onSubmit={(values) => {
        onSaveFormValues(FormScreens.PAYMENT_METHOD, values);
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <Select
              data={PAYMENT_METHODS_OPTIONS}
              fieldProps={{ validate: validateIsRequired }}
              label='Payment Method'
              name='paymentMethod'
            />
          </Box>
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
