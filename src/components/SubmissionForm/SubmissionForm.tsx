import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import { Checkboxes } from 'mui-rff';
import withFormHandler from 'components/FormHandler';
import FormScreens from 'constants/formScreens';
import { InitialFormValuesType } from 'contexts/WizardFormContext';
import { validateIsRequired } from 'utils/validation';

type FormSubmissionType =
  InitialFormValuesType[FormScreens.FORM_SUBMISSION]['values'];

interface Props {
  initialValues: FormSubmissionType;
  onSubmit: (values: FormSubmissionType) => void;
  screen: FormScreens;
}

function SubmissionForm({ initialValues, onSubmit, screen }: Props) {
  return (
    <Form<FormSubmissionType>
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form
          id={screen}
          onSubmit={handleSubmit}>
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
        </form>
      )}
    />
  );
}

const EnhancedSubmissionForm = withFormHandler({
  screen: FormScreens.FORM_SUBMISSION,
})(SubmissionForm);

export default EnhancedSubmissionForm;
