import { Form } from 'react-final-form';
import lowerCase from 'lodash/lowerCase';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
      <Typography
        css={classes.title}
        component='h1'
        variant='h5'>
        Choose {lowerCase(screen)}
      </Typography>
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
