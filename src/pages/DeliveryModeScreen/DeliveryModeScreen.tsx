import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import { Select } from 'mui-rff';
import StepNavigator from 'components/StepNavigator';
import withFormHandler from 'components/withFormScreenProps';
import DELIVERY_MODE_OPTIONS from 'constants/deliveryModeOptions';
import DeliveryModeValues from 'types/deliveryMode';
import StepComponentProps from 'types/formScreen';
import { validateIsRequired } from 'utils/validation';
import * as classes from './styles';

type Props = StepComponentProps<DeliveryModeValues>;

function DeliveryModeScreen({ initialValues, onSubmit, screen }: Props) {
  return (
    <div>
      <h2 css={classes.title}>
        Choose {screen.replace(/_/g, ' ').toLowerCase()}
      </h2>
      <Form<DeliveryModeValues>
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
            <StepNavigator />
          </form>
        )}
      />
    </div>
  );
}

export default withFormHandler<DeliveryModeValues>(DeliveryModeScreen);
