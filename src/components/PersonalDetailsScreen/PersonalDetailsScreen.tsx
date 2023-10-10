/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import Button from '@mui/material/Button';
import { TextField } from 'mui-rff';
import { validateIsRequired, validateEmail } from 'utils/validation';

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
              validate: (value: string) => [
                validateIsRequired(value),
                validateEmail(value),
              ],
            }}
            label='Email'
            name='email'
            placeholder='Enter email'
          />
          <FieldArray name='numbers'>
            {({ fields }) => (
              <div>
                {fields.map((name, index) => (
                  <div key={name}>
                    <TextField
                      label='Number 1'
                      name={`${name}.number1`}
                      placeholder='Enter number 1'
                    />
                    <TextField
                      label='Number 2'
                      name={`${name}.number2`}
                      placeholder='Enter number 2'
                    />
                    <TextField
                      label='Number 3'
                      name={`${name}.number2`}
                      placeholder='Enter number 3'
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
                  Add Number
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
