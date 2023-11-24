import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import { Checkboxes } from 'mui-rff';
import withFormHandler from 'components/withFormScreenProps';
import FormScreens from 'constants/formScreens';
import FormScreenProps from 'types/formScreen';
import FormSubmissionSubmitValues from 'types/formSubmission';
import { validateIsRequired } from 'utils/validation';

interface Props extends FormScreenProps<FormSubmissionSubmitValues> {}

function SubmissionForm({ initialValues, onSubmit, screen }: Props) {
  return (
    <Form<FormSubmissionSubmitValues>
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

export default withFormHandler({
  screen: FormScreens.FORM_SUBMISSION,
})(SubmissionForm);
