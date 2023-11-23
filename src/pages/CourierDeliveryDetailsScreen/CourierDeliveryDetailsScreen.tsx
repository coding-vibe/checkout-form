import { Form } from 'react-final-form';
import { addDays, format } from 'date-fns';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Checkboxes, DatePicker, TextField, TimePicker } from 'mui-rff';
import withFormHandler from 'components/withFormHandler';
import FormScreens from 'constants/formScreens';
import CourierDeliveryDetailsSubmitValues from 'types/courierDeliveryDetails';
import FormScreen from 'types/formScreen';
import {
  composeValidators,
  validateMinDate,
  validateIsRequired,
} from 'utils/validation';
import * as classes from './styles';

const MIN_DELIVERY_DAYS = 3;
const DELIVERY_ERROR_MESSAGE = `Courier delivery is available in a minimum of ${MIN_DELIVERY_DAYS} days`;
const MIN_DELIVERY_DATE = addDays(new Date(), MIN_DELIVERY_DAYS);

const formatHandler = (value: number) => value || null;
const parseHandler = (value: string) => value && parseInt(value, 10);

interface Props<SubmitValues, InitialValues>
  extends FormScreen<SubmitValues, InitialValues> {}

function CourierDeliveryDetailsScreen<SubmitValues, InitialValues>({
  initialValues,
  onSubmit,
  screen,
}: Props<SubmitValues, InitialValues>) {
  return (
    <Form<SubmitValues, SubmitValues | InitialValues | undefined>
      initialValues={initialValues}
      onSubmit={(values) => {
        const { time } = values;
        const formattedValues = {
          ...values,
          time: format(time, 'p'),
        };
        onSubmit(formattedValues);
      }}
      render={({ handleSubmit }) => (
        <form
          id={screen}
          onSubmit={handleSubmit}>
          <fieldset css={classes.fieldset}>
            <Box sx={{ mb: 2, color: 'info.dark' }}>
              <Typography variant='overline'>
                <legend>Choose date and time for courier delivery</legend>
              </Typography>
            </Box>
            <DatePicker
              fieldProps={{
                validate: composeValidators<Date>(
                  validateIsRequired,
                  validateMinDate(MIN_DELIVERY_DAYS, DELIVERY_ERROR_MESSAGE),
                ),
              }}
              label='Date'
              minDate={MIN_DELIVERY_DATE}
              name='date'
              sx={{ mb: 2 }}
            />
            <TimePicker
              fieldProps={{
                validate: validateIsRequired,
              }}
              label='Time'
              name='time'
            />
          </fieldset>
          <fieldset css={classes.fieldset}>
            <Box sx={{ mb: 2, color: 'info.dark' }}>
              <Typography variant='overline'>
                <legend>Enter address details for courier delivery</legend>
              </Typography>
            </Box>
            <TextField
              fieldProps={{ validate: validateIsRequired }}
              label='City'
              name='city'
              placeholder='Enter city name'
              sx={{ mb: 2 }}
            />
            <TextField
              fieldProps={{ validate: validateIsRequired }}
              label='Street'
              name='street'
              placeholder='Enter street name'
              sx={{ mb: 2 }}
            />
            <TextField
              fieldProps={{ validate: validateIsRequired }}
              label='House'
              name='house'
              placeholder='Enter house number'
              sx={{ mb: 2 }}
            />
            <TextField
              fieldProps={{
                format: formatHandler,
                parse: parseHandler,
              }}
              label='Flat'
              name='flat'
              placeholder='Enter flat number'
              sx={{ mb: 2 }}
            />
            <TextField
              fieldProps={{
                format: formatHandler,
                parse: parseHandler,
              }}
              label='Intercom'
              name='intercom'
              placeholder='Enter intercom number'
              sx={{ mb: 2 }}
            />
            <Checkboxes
              data={{
                label: 'There is at least one elevator in the house',
                value: true,
              }}
              name='hasElevator'
            />
          </fieldset>
        </form>
      )}
    />
  );
}

export default withFormHandler<
  CourierDeliveryDetailsSubmitValues,
  Record<string, never>
>({
  screen: FormScreens.COURIER_DELIVERY_DETAILS,
  parentScreen: FormScreens.DELIVERY_MODE,
})(CourierDeliveryDetailsScreen);
