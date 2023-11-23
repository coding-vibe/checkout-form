import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import { Select } from 'mui-rff';
import withFormHandler from 'components/withFormHandler';
import DELIVERY_MODE_OPTIONS from 'constants/deliveryModeOptions';
import FormScreens from 'constants/formScreens';
import DeliveryModeSubmitValues from 'types/deliveryMode';
import FormScreen from 'types/formScreen';
import { validateIsRequired } from 'utils/validation';

interface Props<SubmitValues, InitialValues>
  extends FormScreen<SubmitValues, InitialValues> {}

function DeliveryModeScreen<SubmitValues, InitialValues>({
  initialValues,
  onSubmit,
  screen,
}: Props<SubmitValues, InitialValues>) {
  return (
    <Form<SubmitValues, SubmitValues | InitialValues | undefined>
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

export default withFormHandler<DeliveryModeSubmitValues, Record<string, never>>(
  {
    screen: FormScreens.DELIVERY_MODE,
  },
)(DeliveryModeScreen);
