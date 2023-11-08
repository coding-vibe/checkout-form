import { useContext } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import FormScreens from 'constants/formScreens';
import routes from 'constants/routes';
import WizardFormContext from 'contexts/WizardFormContext';
import * as classes from './styles';

export default function FullOrderDetails() {
  const { formValues } = useContext(WizardFormContext);

  return (
    <div>
      <Paper>
        <h1 css={classes.mainTitle}>Verify recorded form data</h1>
      </Paper>
      {Object.entries(formValues).map(([screenName, screenInfo]) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        screenName !== FormScreens.FORM_SUBMISSION ? (
          <Paper
            sx={{ p: 1, mb: 1 }}
            key={screenName}>
            <div css={classes.wrap}>
              <h2 css={classes.title}>{screenName}&nbsp;</h2>
              <Tooltip
                title={`Click to return to ${screenName.toLowerCase()} section`}>
                <Link
                  href={routes[screenName as FormScreens]}
                  underline='hover'>
                  <ArrowBackIcon />
                </Link>
              </Tooltip>
            </div>
            {!!screenInfo &&
              Object.entries(screenInfo).map(([fieldName, fieldValue]) => (
                <Box
                  key={fieldName}
                  sx={{ p: 1 }}>
                  <span css={classes.fieldName}>{fieldName}:&nbsp;</span>
                  <span css={classes.fieldValue}>{fieldValue}</span>
                </Box>
              ))}
          </Paper>
        ) : null,
      )}
    </div>
  );
}
