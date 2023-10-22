import { useContext } from 'react';
import { Form } from 'react-final-form';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Select } from 'mui-rff';
import FormScreens from 'constants/formScreens';
import WizardFormContext, {
  initialFormValues,
} from 'contexts/WizardFormContext';
import { validateIsRequired } from 'utils/validation';

type PaymentMethodType = (typeof initialFormValues)[FormScreens.PAYMENT_METHOD];

export default function PaymentMethodScreen() {
  const { onSaveFormValues } = useContext(WizardFormContext);
  const PAYMENT_METHOD_OPTIONS = {
    cash: 'Cash',
    creditCard: 'Credit Card',
  };
  const PAYMENT_METHOD_VALUES = {
    cash: 'cash',
    creditCard: 'creditCard',
  };

  return (
    <Form<PaymentMethodType>
      onSubmit={(values) => {
        onSaveFormValues(FormScreens.PAYMENT_METHOD, values);
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Select
            fieldProps={{ validate: validateIsRequired }}
            label='Payment Method'
            name='paymentMethod'
            sx={{ mb: 2 }}>
            <MenuItem value={PAYMENT_METHOD_VALUES.cash}>
              {PAYMENT_METHOD_OPTIONS.cash}
            </MenuItem>
            <MenuItem value={PAYMENT_METHOD_VALUES.creditCard}>
              {PAYMENT_METHOD_OPTIONS.creditCard}
            </MenuItem>
          </Select>
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
