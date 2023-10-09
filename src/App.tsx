import { Form } from 'react-final-form';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { TextField, Select } from 'mui-rff';
import { validateIsRequired } from 'utils/validation';

function App() {
  return (
    <Form
      onSubmit={() => {}}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            fieldProps={{ validate: validateIsRequired }}
            name='firstName'
          />
          <Select
            fieldProps={{ validate: validateIsRequired }}
            name='test'>
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Thee</MenuItem>
          </Select>
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
