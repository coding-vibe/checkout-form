import { useContext } from 'react';
import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl/FormControl';
import { Select } from 'mui-rff';
import FormScreens from 'constants/formScreens';
import WizardFormContext, {
  InitialFormValuesType,
} from 'contexts/WizardFormContext';
import { validateIsRequired } from 'utils/validation';
import POST_COMPANIES from './postCompanies';

type PostOfficeDeliveryDetails =
  InitialFormValuesType[FormScreens.POST_DELIVERY_DETAILS];

export default function PostOfficeDeliveryDetailsScreen() {
  const { onSaveFormValues } = useContext(WizardFormContext);

  return (
    <Form<PostOfficeDeliveryDetails>
      onSubmit={(values) => {
        onSaveFormValues(FormScreens.POST_DELIVERY_DETAILS, values);
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Box sx={{ mb: 2 }}>
              <Select
                data={POST_COMPANIES}
                fieldProps={{ validate: validateIsRequired }}
                label='Post Company'
                name='postCompany'
              />
            </Box>
          </FormControl>
          <FormControl>
            <Box sx={{ mb: 2 }}>
              <Select
                data={POST_OFFICES}
                fieldProps={{ validate: validateIsRequired }}
                label='Post Office'
                name='postOffice'
              />
            </Box>
            <Button
              type='submit'
              variant='contained'>
              Next step
            </Button>
          </FormControl>
        </form>
      )}
    />
  );
}
