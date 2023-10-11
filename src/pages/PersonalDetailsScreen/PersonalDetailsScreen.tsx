/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import Button from '@mui/material/Button';
import { TextField } from 'mui-rff';
import {
  maxValue,
  minValue,
  validateEmail,
  validateIsRequired,
  validatePhoneNumber,
} from 'utils/validation';

const composeValidators =
  (...validators: any[]) =>
  (value: any) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    );

export default function PersonalDetailsScreen() {
  return (
    <Form
      onSubmit={() => {}}
      mutators={{
        ...arrayMutators,
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
              validate: (value: string) => {
                const errorMessages = [
                  validateIsRequired(value),
                  validateEmail(value),
                ];
                for (let i = 0; i < errorMessages.length; i += 1)
                  if (errorMessages[i]) {
                    return errorMessages[i];
                  }

                return undefined;
              },
            }}
            label='Email'
            name='email'
            placeholder='Enter email'
          />
          <FieldArray
            name='phoneNumbers'
            validate={composeValidators(minValue(1))}>
            {({ fields }) => (
              <div>
                {fields.map((name, index) => (
                  <div key={name}>
                    <TextField
                      label={`Phone number ${index + 1}`}
                      name={`${name}.phoneNumber${index + 1}`}
                      placeholder={`Enter phone number ${index + 1}`}
                    />
                    <Button
                      type='button'
                      onClick={() => fields.remove(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type='button'
                  onClick={() => fields.push({})}>
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
