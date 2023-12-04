import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import { Select } from 'mui-rff';
import withFormHandler from 'components/withFormScreenProps';
import DELIVERY_MODE_OPTIONS from 'constants/deliveryModeOptions';
import FormScreens from 'constants/formScreens';
import { DeliveryModeSubmitValues } from 'types/deliveryMode';
import FormScreenProps from 'types/formScreen';
import { validateIsRequired } from 'utils/validation';

interface Props extends FormScreenProps<DeliveryModeSubmitValues> {}

function DeliveryModeScreen({ initialValues, onSubmit, screen }: Props) {
  return (
    <Form<DeliveryModeSubmitValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form
          id={screen}
          onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <Select
              data={DELIVERY_MODE_OPTIONS}
              fieldProps={{ validate: validateIsRequired }}
              label='Delivery Type'
              name='deliveryType'
            />
          </Box>
        </form>
      )}
    />
  );
}

export default withFormHandler({
  screen: FormScreens.DELIVERY_MODE,
})(DeliveryModeScreen);
