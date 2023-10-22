import { useContext } from 'react';
import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Select } from 'mui-rff';
import FormScreens from 'constants/formScreens';
import WizardFormContext, {
  initialFormValues,
} from 'contexts/WizardFormContext';
import { validateIsRequired } from 'utils/validation';

const PAYMENT_METHOD_OPTIONS = {
  cash: 'Cash',
  creditCard: 'Credit Card',
};
const PAYMENT_METHOD_VALUES = {
  cash: 'cash',
  creditCard: 'creditCard',
};

type PaymentMethod = (typeof initialFormValues)[FormScreens.PAYMENT_METHOD];

export default function PaymentMethodScreen() {
  const { onSaveFormValues } = useContext(WizardFormContext);

  return (
    <Form<PaymentMethod>
      onSubmit={(values) => {
        onSaveFormValues(FormScreens.PAYMENT_METHOD, values);
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <Select
              fieldProps={{ validate: validateIsRequired }}
              label='Payment Method'
              name='paymentMethod'>
              <MenuItem value={PAYMENT_METHOD_VALUES.cash}>
                {PAYMENT_METHOD_OPTIONS.cash}
              </MenuItem>
              <MenuItem value={PAYMENT_METHOD_VALUES.creditCard}>
                {PAYMENT_METHOD_OPTIONS.creditCard}
              </MenuItem>
            </Select>
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
