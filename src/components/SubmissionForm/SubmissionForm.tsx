import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import { Checkboxes } from 'mui-rff';
import StepNavigator from 'components/StepNavigator';
import withFormHandler from 'components/withFormScreenProps';
import StepComponentProps from 'types/formScreen';
import FormSubmissionValues from 'types/formSubmission';
import { validateIsRequired } from 'utils/validation';

type Props = StepComponentProps<FormSubmissionValues>;

function SubmissionForm({ initialValues, onSubmit, screen }: Props) {
  return (
    <Form<FormSubmissionValues>
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
          <StepNavigator />
        </form>
      )}
    />
  );
}

export default withFormHandler<FormSubmissionValues>(SubmissionForm);
