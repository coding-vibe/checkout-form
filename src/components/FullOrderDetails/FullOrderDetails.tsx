import { useContext } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import FormScreens from 'constants/formScreens';
import routes from 'constants/routes';
import WizardFormContext, {
  InitialFormValuesType,
} from 'contexts/WizardFormContext';
import * as classes from './styles';

type ExcludeKeys<T, K> = { [P in Exclude<keyof T, K>]: T[P] };

type FormScreenValueType = ExcludeKeys<
  InitialFormValuesType,
  FormScreens.FORM_SUBMISSION | FormScreens.FORM_SUCCESS
>;

export default function FullOrderDetails() {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    [FormScreens.FORM_SUBMISSION]: _,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    [FormScreens.FORM_SUCCESS]: __,
    ...formValues
  } = useContext(WizardFormContext).formValues;
  const orderDetails = {
    ...formValues,
  };

  return (
    <div>
      <Paper>
        <h1 css={classes.mainTitle}>Verify recorded form data</h1>
      </Paper>
      {Object.entries<FormScreenValueType>(orderDetails)
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
