import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import Button from '@mui/material/Button';
import { TextField } from 'mui-rff';
import {
  maxValue,
  // minValue,
  validateEmail,
  validateIsRequired,
  validatePhoneNumber,
} from 'utils/validation';

// const composeValidators =
//   (...validators: any[]) =>
//   (value: any) =>
//     validators.reduce(
//       (error, validator) => error || validator(value),
//       undefined,
//     );

export default function PersonalDetailsScreen() {
  return (
    <Form
      onSubmit={() => {}}
      mutators={{
        ...arrayMutators,
      }}
      render={({ handleSubmit, values, errors }) => (
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
            validate={(values) =>
              !values
                ? `Should be at least 1 phone number`
                : maxValue(3, values.length)
            }>
            {({ fields }) => (
              <div>
                {fields.map((name, index) => (
                  <div key={name}>
                    <TextField
                      fieldProps={{ validate: validatePhoneNumber }}
                      label={`Phone number ${index + 1}`}
                      name={`${name}.phoneNumber${index + 1}`}
                      placeholder={`Enter phone number ${index + 1}`}
                    />
                    <Button
                      type='button'
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                      onClick={() => fields.remove(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type='button'
                  onClick={() => fields.push({})}
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
          <pre>errors{JSON.stringify(errors, null, 2)}</pre>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </form>
      )}
    />
  );
}
