import { useContext } from 'react';
import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Select } from 'mui-rff';
import DELIVERY_MODE_OPTIONS from 'constants/deliveryModeOptions';
import FormScreens from 'constants/formScreens';
import WizardFormContext, {
  InitialFormValuesType,
} from 'contexts/WizardFormContext';
import { validateIsRequired } from 'utils/validation';

type DeliveryModeType = InitialFormValuesType[FormScreens.DELIVERY_MODE];

export default function DeliveryModeScreen() {
  const { onSaveFormValues } = useContext(WizardFormContext);

  return (
    <Form<DeliveryModeType>
      onSubmit={(values) => {
        onSaveFormValues(FormScreens.DELIVERY_MODE, values);
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <Select
              data={DELIVERY_MODE_OPTIONS}
              fieldProps={{ validate: validateIsRequired }}
              label='Delivery Type'
              name='deliveryType'
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
