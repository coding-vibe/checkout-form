import { Form } from 'react-final-form';
import { addDays } from 'date-fns';
import lowerCase from 'lodash/lowerCase';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Checkboxes, DatePicker, TextField, TimePicker } from 'mui-rff';
import StepNavigator from 'components/StepNavigator';
import withFormHandler from 'components/withFormScreenProps';
import { DATE_FORMAT, TIME_FORMAT } from 'constants/dateFormats';
import CourierDeliveryDetailsValues from 'types/courierDeliveryDetails';
import StepComponentProps from 'types/formScreen';
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

type Props = StepComponentProps<CourierDeliveryDetailsValues>;

function CourierDeliveryDetailsScreen({
  initialValues,
  onSubmit,
  screen,
}: Props) {
  return (
    <div>
      <Typography
        css={classes.title}
        component='h1'
        variant='h5'>
        Provide {lowerCase(screen)}
      </Typography>
      <Form<CourierDeliveryDetailsValues>
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form
            id={screen}
            onSubmit={handleSubmit}>
            <fieldset css={classes.fieldset}>
              <Box sx={{ mb: 2 }}>
                <Typography
                  css={classes.legend}
                  variant='overline'>
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
                format={DATE_FORMAT}
                minDate={MIN_DELIVERY_DATE}
                name='date'
                sx={{ mb: 2 }}
              />
              <TimePicker
                fieldProps={{
                  validate: validateIsRequired,
                }}
                format={TIME_FORMAT}
                label='Time'
                name='time'
              />
            </fieldset>
            <fieldset css={classes.fieldset}>
              <Box sx={{ mb: 2 }}>
                <Typography
                  css={classes.legend}
                  variant='overline'>
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
                  label: 'There is an elevator in the house',
                  value: true,
                }}
                name='hasElevator'
              />
            </fieldset>
            <StepNavigator />
          </form>
        )}
      />
    </div>
  );
}

export default withFormHandler<CourierDeliveryDetailsValues>(
  CourierDeliveryDetailsScreen,
);
