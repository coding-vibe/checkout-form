import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { ARRAY_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import Button from '@mui/material/Button';
import { FormHelperText } from '@mui/material';
import { TextField } from 'mui-rff';
import {
  composeValidators,
  validateEmail,
  validateIsRequired,
  validatePhoneNumber,
} from 'utils/validation';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumbers: string[];
}

const MIN_ARRAY_LENGTH = 1;
const MAX_ARRAY_LENGTH = 3;

export default function PersonalDetailsScreen() {
  return (
    <Form<FormValues>
      onSubmit={() => {}}
      mutators={{
        ...arrayMutators,
      }}
      validate={(values) => {
        let phoneNumberError;

        if (!values.phoneNumbers) {
          phoneNumberError = `Should be at least ${MIN_ARRAY_LENGTH} phone number`;
        }

        if (
          values.phoneNumbers &&
          values.phoneNumbers.length > MAX_ARRAY_LENGTH
        ) {
          phoneNumberError = `Should be not more than ${MAX_ARRAY_LENGTH} phone numbers`;
        }

        return phoneNumberError
          ? { phoneNumbers: { [ARRAY_ERROR]: phoneNumberError } }
          : undefined;
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            fieldProps={{ validate: validateIsRequired }}
            label='First Name'
            name='firstName'
            placeholder='Enter first name'
            sx={{ mb: 2 }}
          />
          <TextField
            fieldProps={{ validate: validateIsRequired }}
            label='Last Name'
            name='lastName'
            placeholder='Enter last name'
            sx={{ mb: 2 }}
          />
          <TextField
            fieldProps={{
              validate: composeValidators(validateIsRequired, validateEmail),
            }}
            label='Email'
            name='email'
            placeholder='Enter email'
          />
          <FieldArray<string> name='phoneNumbers'>
            {({ fields, meta: { error, touched } }) => (
              <div>
                {fields.map((name, index) => (
                  <div key={name}>
                    <TextField
                      fieldProps={{ validate: validatePhoneNumber }}
                      label={`Phone number ${index + 1}`}
                      name={name}
                      placeholder={`Enter phone number ${index + 1}`}
                      sx={{ mt: 2 }}
                    />
                    <Button
                      onClick={() => fields.remove(index)}
                      type='button'>
                      Remove
                    </Button>
                  </div>
                ))}
                {error && !Array.isArray(error) && touched && (
                  <FormHelperText error>{error}</FormHelperText>
                )}
                <Button
                  disabled={
                    !!fields.length && fields.length >= MAX_ARRAY_LENGTH
                  }
                  onClick={() => fields.push('')}
                  sx={{ my: 2 }}
                  type='button'>
                  Add phone number
                </Button>
              </div>
            )}
          </FieldArray>
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
