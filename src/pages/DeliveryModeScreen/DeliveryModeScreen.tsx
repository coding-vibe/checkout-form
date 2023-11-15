import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import { Select } from 'mui-rff';
import withFormHandler from 'components/withFormHandler';
import DELIVERY_MODE_OPTIONS from 'constants/deliveryModeOptions';
import FormScreens from 'constants/formScreens';
import { InitialFormValuesType } from 'contexts/WizardFormContext';
import { validateIsRequired } from 'utils/validation';

type DeliveryModeType =
  InitialFormValuesType[FormScreens.DELIVERY_MODE]['values'];

interface Props {
  initialValues: DeliveryModeType;
  onSubmit: (values: DeliveryModeType) => void;
  screen: FormScreens;
}

function DeliveryModeScreen({ initialValues, onSubmit, screen }: Props) {
  return (
    <Form<DeliveryModeType>
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
