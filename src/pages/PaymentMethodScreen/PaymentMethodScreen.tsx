import { useContext } from 'react';
import { Form } from 'react-final-form';
import Button from '@mui/material/Button';
import { MenuItem } from '@mui/material';
import { Select } from 'mui-rff';
import FormScreens from 'constants/formScreens';
import WizardFormContext from 'contexts/WizardFormContext';
import { validateIsRequired } from 'utils/validation';

type PaymentMethod = { paymentMethod: null };

export default function PaymentMethodScreen() {
  const { onSaveFormValues } = useContext(WizardFormContext);

  return (
    <Form<PaymentMethod>
      onSubmit={(values) => {
        onSaveFormValues(FormScreens.PAYMENT_METHOD, values);
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Select
            fieldProps={{ validate: validateIsRequired }}
            label='Payment Method'
            name='paymentMethod'>
            <MenuItem value='cash'>Cash</MenuItem>
            <MenuItem value='creditCard'>Credit Card</MenuItem>
          </Select>
          <Button
            sx={{ mt: 2 }}
            type='submit'
            variant='contained'>
            Next step
          </Button>
        </form>
      )}
    />
  );
}
