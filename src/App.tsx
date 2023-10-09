import { Form, Field } from 'react-final-form';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

function App() {
  const required = (value: string) => (value ? undefined : 'Required');

  return (
    <Form
      onSubmit={() => {}}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name='firstName'
            validate={required}>
            {({ input, meta }) => {
              const hasError = meta?.touched && !!meta?.error;
              const { name, value, onChange } = input;

              return (
                <TextField
                  error={hasError}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  helperText={hasError ? meta?.error : ''}
                  name={name}
                  onChange={onChange}
                  value={value}
                />
              );
            }}
          </Field>
          <Field
            name='test'
            validate={required}>
            {({ input, meta }) => {
              const hasError = meta?.touched && !!meta?.error;
              const { name, value, onChange } = input;

              return (
                <FormControl error={hasError}>
                  <Select
                    name={name}
                    onChange={onChange}
                    value={value}>
                    <MenuItem value={1}>One</MenuItem>
                    <MenuItem value={2}>Two</MenuItem>
                    <MenuItem value={3}>Thee</MenuItem>
                  </Select>
                  <FormHelperText>{hasError ? meta?.error : ''}</FormHelperText>
                </FormControl>
              );
            }}
          </Field>
          <Button
            type='submit'
            variant='contained'>
            Submit
          </Button>
        </form>
      )}
    />
  );
}

export default App;
