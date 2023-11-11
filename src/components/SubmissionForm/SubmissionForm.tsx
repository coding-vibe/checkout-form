import { useContext } from 'react';
import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Checkboxes } from 'mui-rff';
import FormScreens from 'constants/formScreens';
import WizardFormContext, {
  InitialFormValuesType,
  initialFormValues,
} from 'contexts/WizardFormContext';
import { validateIsRequired } from 'utils/validation';

type FormSubmissionType =
  InitialFormValuesType[FormScreens.FORM_SUBMISSION]['values'];

export default function SubmissionForm() {
  const { onSaveFormValues } = useContext(WizardFormContext);

  return (
    <Form<FormSubmissionType>
      initialValues={initialFormValues[FormScreens.FORM_SUBMISSION].values}
      onSubmit={(values) => {
        onSaveFormValues(FormScreens.FORM_SUBMISSION, values);
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <Checkboxes
              data={{
                label: 'I agree with the delivery rules',
                value: true,
              }}
              fieldProps={{
                validate: validateIsRequired,
              }}
              name='isAgree'
            />
          </Box>
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
