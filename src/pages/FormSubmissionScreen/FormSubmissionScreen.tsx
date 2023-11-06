import { useContext } from 'react';
import { Form } from 'react-final-form';
import { Checkboxes } from 'mui-rff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import WizardFormContext, {
  InitialFormValuesType,
} from 'contexts/WizardFormContext';
import FormScreens from 'constants/formScreens';
import routes from 'constants/routes';
import { validateIsRequired } from 'utils/validation';
import * as classes from './styles';

type FormSubmissionType = InitialFormValuesType[FormScreens.FORM_SUBMISSION];

export default function FormSubmissionScreen() {
  const { formValues, onSaveFormValues } = useContext(WizardFormContext);

  return (
    <div>
      <Paper>
        <h1 css={classes.mainTitle}>Verify recorded form data</h1>
      </Paper>
      {Object.entries(formValues).map(([screenName, screenInfo], index) =>
        screenName !== 'FORM_SUBMISSION' ? (
          <Paper
            sx={{ p: 1, mb: 1 }}
            // eslint-disable-next-line react/no-array-index-key
            key={Object.keys(screenInfo)[index]}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <h2 css={classes.title}>{screenName}&nbsp;</h2>
              <Tooltip
                title={`Click to return to ${screenName.toLowerCase()} section`}>
                <Link
                  href={routes[screenName as FormScreens]}
                  underline='hover'>
                  <ArrowBackIcon />
                </Link>
              </Tooltip>
            </Box>
            {screenInfo &&
              Object.entries(screenInfo).map(([fieldName, fieldValue]) => (
                <Box sx={{ p: 1 }}>
                  <span css={classes.fieldName}>{fieldName}:&nbsp;</span>
                  <span css={classes.fieldValue}>{fieldValue}</span>
                </Box>
              ))}
          </Paper>
        ) : null,
      )}
      <Form<FormSubmissionType>
        onSubmit={(values) => {
          onSaveFormValues(FormScreens.FORM_SUBMISSION, values);
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Checkboxes
                fieldProps={{ validate: validateIsRequired }}
                data={{
                  label: 'I agree with the delivery rules',
                  value: true,
                }}
                name='isAgree'
              />
            </Box>
            <Button
              type='submit'
              variant='contained'>
              Next step
            </Button>
          </form>
        )}
      />
    </div>
  );
}
