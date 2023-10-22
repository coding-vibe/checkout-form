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

const DELIVERY_MODE_OPTIONS = {
  postOffice: 'Post Office Delivery',
  courier: 'Courier Delivery',
};
const DELIVERY_MODE_VALUES = {
  postOffice: 'postOffice',
  courier: 'courier',
};

type DeliveryMode = (typeof initialFormValues)[FormScreens.DELIVERY_MODE];

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
            sx={{ mb: 2 }}>
            <MenuItem value={DELIVERY_MODE_VALUES.postOffice}>
              {DELIVERY_MODE_OPTIONS.postOffice}
            </MenuItem>
            <MenuItem value={DELIVERY_MODE_VALUES.courier}>
              {DELIVERY_MODE_OPTIONS.courier}
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
