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
  const CASH_PAYMENT_OPTION = 'Cash';
  const CARD_PAYMENT_OPTION = 'Credit Card';
  const CASH_PAYMENT_VALUE = 'cash';
  const CARD_PAYMENT_VALUE = 'creditCard';

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
            <MenuItem value={CASH_PAYMENT_VALUE}>
              {CASH_PAYMENT_OPTION}
            </MenuItem>
            <MenuItem value={CARD_PAYMENT_VALUE}>
              {CARD_PAYMENT_OPTION}
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
