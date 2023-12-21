import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import lowerCase from 'lodash/lowerCase';
import upperFirst from 'lodash/upperFirst';
import words from 'lodash/words';
import FormScreens from 'constants/formScreens';
import WizardFormContext from 'contexts/WizardFormContext';
import * as classes from './styles';

export default function FullOrderDetails() {
  const { values } = useContext(WizardFormContext);

  return (
    <div>
      <Paper>
        <Typography
          css={classes.mainTitle}
          component='h1'
          variant='h5'>
          Verify recorded form data
        </Typography>
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
              <Typography
                component='h2'
                variant='h6'>
                {upperFirst(lowerCase(step.id.replace(/_/g, ' ')))}&nbsp;
              </Typography>
              <Tooltip
                title={`Click to return to '${upperFirst(
                  lowerCase(step.id.replace(/_/g, ' ')),
                )}' section`}>
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
                  <span css={classes.fieldName}>
                    {upperFirst(lowerCase(words(fieldName).join(' ')))}:&nbsp;
                  </span>
                  <span css={classes.fieldValue}>
                    {typeof fieldValue === 'string' && fieldName !== 'email'
                      ? upperFirst(lowerCase(words(fieldValue).join(' ')))
                      : fieldValue}
                  </span>
                </Box>
              ))}
          </Paper>
        ))}
    </div>
  );
}
