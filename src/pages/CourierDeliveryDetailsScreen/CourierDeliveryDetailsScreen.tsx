import { useContext } from 'react';
import { Form } from 'react-final-form';
import { addDays } from 'date-fns';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DatePicker, TextField, TimePicker, Select } from 'mui-rff';
import ELEVATOR_AVAILABILITY_OPTIONS from 'constants/elevatorAvailabilityOptions';
import FormScreens from 'constants/formScreens';
import WizardFormContext, {
  InitialFormValuesType,
} from 'contexts/WizardFormContext';
import {
  composeValidators,
  isPositiveInteger,
  validateMinDate,
  validateIsRequired,
} from 'utils/validation';

export const MIN_DATE = addDays(new Date(), 3);

type CourierDeliveryDetailsType =
  InitialFormValuesType[FormScreens.COURIER_DELIVERY_DETAILS];

export default function DeliveryDetailsScreen() {
  const { formValues, onSaveFormValues } = useContext(WizardFormContext);
  console.log(formValues);

  return (
    <Form<CourierDeliveryDetailsType>
      onSubmit={(values) => {
        onSaveFormValues(FormScreens.COURIER_DELIVERY_DETAILS, values);
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <span>Choose date and time for courier delivery</span>
          </Box>
          <DatePicker
            defaultValue={MIN_DATE}
            fieldProps={{
              validate: composeValidators(validateIsRequired, validateMinDate),
            }}
            label='Date'
            minDate={MIN_DATE}
            name='date'
            sx={{ mb: 2 }}
          />
          <TimePicker
            fieldProps={{ validate: validateIsRequired }}
            label='Time'
            name='time'
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2 }}>
            <span>Enter address details for courier delivery</span>
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
              validate: isPositiveInteger('flat'),
            }}
            label='Flat'
            name='flat'
            placeholder='Enter flat number'
            sx={{ mb: 2 }}
          />
          <TextField
            fieldProps={{ validate: isPositiveInteger('intercom') }}
            label='Intercom'
            name='intercom'
            placeholder='Enter intercom number'
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2 }}>
            <Select
              data={ELEVATOR_AVAILABILITY_OPTIONS}
              fieldProps={{ validate: validateIsRequired }}
              label='Do you have an elevator?'
              name='hasElevator'
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
