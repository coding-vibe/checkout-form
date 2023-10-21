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
  const { formValues, onSaveFormValues } = useContext(WizardFormContext);

  console.log(formValues);

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
            name='paymentMethod'
            placeholder='Choose payment method'
            sx={{ mb: 2 }}>
            <MenuItem>Cash</MenuItem>
            <MenuItem>Credit Card</MenuItem>
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
