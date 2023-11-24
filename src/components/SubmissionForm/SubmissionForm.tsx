import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import { Checkboxes } from 'mui-rff';
import withFormHandler from 'components/withFormScreenProps';
import FormScreens from 'constants/formScreens';
import FormScreenProps from 'types/formScreen';
import FormSubmissionSubmitValues from 'types/formSubmission';
import { validateIsRequired } from 'utils/validation';

interface Props<SubmitValues, InitialValues>
  extends FormScreenProps<SubmitValues, InitialValues> {}

function SubmissionForm<SubmitValues, InitialValues>({
  initialValues,
  onSubmit,
  screen,
}: Props<SubmitValues, InitialValues>) {
  return (
    <Form<SubmitValues, SubmitValues | InitialValues | undefined>
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

export default withFormHandler<
  FormSubmissionSubmitValues,
  Record<string, never>
>({
  screen: FormScreens.FORM_SUBMISSION,
})(SubmissionForm);
