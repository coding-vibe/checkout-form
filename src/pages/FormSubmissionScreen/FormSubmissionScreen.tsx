import { useContext } from 'react';
import { Checkboxes } from 'mui-rff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import WizardFormContext from 'contexts/WizardFormContext';
import routes from 'constants/routes';
import * as classes from './styles';

export default function FormSubmissionScreen() {
  const { formValues } = useContext(WizardFormContext);

  return (
    <div>
      <h1 css={classes.mainTitle}>Verify recorded form data</h1>
      {Object.entries(formValues).map(([screenName, screenInfo], idx) => (
        <Paper
          sx={{ p: 1, mb: 1 }}
          // eslint-disable-next-line react/no-array-index-key
          key={idx}>
          <div css={classes.titleWrap}>
            <h2 css={classes.title}>{screenName}&nbsp;</h2>
            <Tooltip title='Click to return to the previous section'>
              <Link
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                href={routes[screenName]}
                underline='hover'>
                <ArrowBackIcon />
              </Link>
            </Tooltip>
          </div>
          {screenInfo &&
            Object.entries(screenInfo).map(([fieldName, fieldValue]) => (
              <div css={classes.wrap}>
                <span>{fieldName}:&nbsp;</span>
                <span>{fieldValue}</span>
              </div>
            ))}
        </Paper>
      ))}
      <Checkboxes></Checkboxes>
      <Button
        type='submit'
        variant='contained'>
        Next step
      </Button>
    </div>
  );
}
