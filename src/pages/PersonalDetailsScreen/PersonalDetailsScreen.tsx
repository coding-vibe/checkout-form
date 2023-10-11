import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { ARRAY_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import Button from '@mui/material/Button';
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

const MIN__ARRAY_LENGTH = 1;
const MAX__ARRAY_LENGTH = 3;

export default function PersonalDetailsScreen() {
  return (
    <Form
      onSubmit={() => {}}
      mutators={{
        ...arrayMutators,
      }}
      validate={(values: FormValues) => {
        const errors = { phoneNumbers: [] };
        if (!values.phoneNumbers) {
          errors.phoneNumbers[
            ARRAY_ERROR
          ] = `Should be at least ${MIN__ARRAY_LENGTH} phone number`;

          return errors;
        }

        if (
          values.phoneNumbers &&
          values.phoneNumbers.length > MAX__ARRAY_LENGTH
        ) {
          errors.phoneNumbers[
            ARRAY_ERROR
          ] = `Should be not more than ${MAX__ARRAY_LENGTH} phone numbers`;

          return errors;
        }

        return undefined;
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            fieldProps={{ validate: validateIsRequired }}
            label='First Name'
            name='firstName'
            placeholder='Enter first name'
          />
          <TextField
            fieldProps={{ validate: validateIsRequired }}
            label='Last Name'
            name='lastName'
            placeholder='Enter last name'
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
            {({ fields, meta: { error } }) => (
              <div>
                {fields.map((name, index) => (
                  <div key={name}>
                    <TextField
                      fieldProps={{ validate: validatePhoneNumber }}
                      label={`Phone number ${index + 1}`}
                      name={name}
                      placeholder={`Enter phone number ${index + 1}`}
                    />
                    <Button
                      type='button'
                      onClick={() => fields.remove(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
                {error && <div>{error}</div>}
                <Button
                  type='button'
                  onClick={() => fields.push('')}
                  disabled={!!fields.length && fields.length >= 3}>
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
