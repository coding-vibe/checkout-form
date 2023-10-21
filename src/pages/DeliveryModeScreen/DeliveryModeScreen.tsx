import { useContext } from 'react';
import { Form } from 'react-final-form';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Select } from 'mui-rff';
import FormScreens from 'constants/formScreens';
import WizardFormContext from 'contexts/WizardFormContext';
import { validateIsRequired } from 'utils/validation';

type DeliveryMode = { deliveryMode: null };

export default function DeliveryModeScreen() {
  const { onSaveFormValues } = useContext(WizardFormContext);

  return (
    <Form<DeliveryMode>
      onSubmit={(values) => {
        onSaveFormValues(FormScreens.DELIVERY_MODE, values);
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Select
            fieldProps={{ validate: validateIsRequired }}
            label='Delivery Type'
            name='deliveryType'
            placeholder='Choose delivery type'
            sx={{ mb: 2 }}>
            <MenuItem value='postOffice'>Post Office Delivery</MenuItem>
            <MenuItem value='courier'>Courier Delivery</MenuItem>
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
