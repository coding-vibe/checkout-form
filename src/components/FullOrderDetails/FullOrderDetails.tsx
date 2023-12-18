import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import FormScreens from 'constants/formScreens';
import WizardFormContext from 'contexts/WizardFormContext';
import * as classes from './styles';

export default function FullOrderDetails() {
  const { values } = useContext(WizardFormContext);

  return (
    <div>
      <Paper>
        <h1 css={classes.mainTitle}>Verify recorded form data</h1>
      </Paper>
      {values
        .filter(
          ({ id }) =>
            id !== FormScreens.FORM_SUBMISSION &&
            id !== FormScreens.FORM_SUCCESS,
        )
        .map((step) => (
          <Paper
            sx={{ p: 1, mb: 1 }}
            key={step.id}>
            <div css={classes.wrap}>
              <h2 css={classes.title}>{step.id}&nbsp;</h2>
              <Tooltip
                title={`Click to return to ${step.id.toLowerCase()} section`}>
                <Link
                  component={RouterLink}
                  to={step.url}
                  underline='hover'>
                  <ArrowBackIcon />
                </Link>
              </Tooltip>
            </div>
            {step.values &&
              Object.entries(step.values).map(([fieldName, fieldValue]) => (
                <Box
                  key={fieldName}
                  sx={{ p: 1 }}>
                  <span css={classes.fieldName}>{fieldName}:&nbsp;</span>
                  <span css={classes.fieldValue}>{fieldValue}</span>
                </Box>
              ))}
          </Paper>
        ))}
    </div>
  );
}
