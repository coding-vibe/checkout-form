import { useContext } from 'react';
import omit from 'lodash/omit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import FormScreens from 'constants/formScreens';
import routes from 'constants/routes';
import WizardFormContext, { FormValuesType } from 'contexts/WizardFormContext';
import * as classes from './styles';

type FullOrderDetailsType = FormValuesType[keyof Omit<
  FormValuesType,
  FormScreens.FORM_SUBMISSION | FormScreens.FORM_SUCCESS
>];

export default function FullOrderDetails() {
  const { formValues } = useContext(WizardFormContext);
  const orderDetails = omit(
    formValues,
    FormScreens.FORM_SUBMISSION,
    FormScreens.FORM_SUCCESS,
  );

  return (
    <div>
      <Paper>
        <h1 css={classes.mainTitle}>Verify recorded form data</h1>
      </Paper>
      {Object.entries<FullOrderDetailsType>(orderDetails)
        .filter(
          ([screenName]) =>
            (screenName as FormScreens) !== FormScreens.FORM_SUBMISSION ||
            (screenName as FormScreens) !== FormScreens.FORM_SUCCESS,
        )
        .map(([screenName, { values }]) => (
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
            {Object.entries(values).map(([fieldName, fieldValue]) => (
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
