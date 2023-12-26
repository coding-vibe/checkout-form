import { useContext, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormScreens from 'constants/formScreens';
import { DATE_FORMAT, TIME_FORMAT } from 'constants/dateFormats';
import WizardFormContext from 'contexts/WizardFormContext';
import convertToSentenceCase from 'utils/convertToSentenceCase';
import * as classes from './styles';

const DISPLAY_RAW_DATA_FIELDS = ['email', 'house'];

export default function FullOrderDetails() {
  const { values } = useContext(WizardFormContext);

  const renderFieldValue = (
    key: string,
    value: unknown,
  ): ReactNode | string | null => {
    if (DISPLAY_RAW_DATA_FIELDS.includes(key)) {
      return value as string;
    }

    if (value instanceof Date) {
      if (key === 'date') {
        return format(value, DATE_FORMAT);
      }
      if (key === 'time') {
        return format(value, TIME_FORMAT);
      }
    }

    if (typeof value === 'number') {
      return value;
    }

    if (typeof value === 'string') {
      return convertToSentenceCase(value);
    }

    if (typeof value === 'boolean') {
      return (
        <Checkbox
          sx={{ p: 0 }}
          defaultChecked={value}
          disabled
        />
      );
    }

    if (Array.isArray(value)) {
      return value.join(', ');
    }

    return null;
  };

  return (
    <div>
      <Typography
        css={classes.mainTitle}
        component='h1'
        variant='h5'>
        Review your order
      </Typography>
      {values
        .filter(
          ({ id }) =>
            id !== FormScreens.FORM_SUBMISSION &&
            id !== FormScreens.FORM_SUCCESS &&
            id !== FormScreens.CREDIT_CARD_DETAILS,
        )
        .map((step) => (
          <Paper
            sx={{ p: 1.5, mb: 4 }}
            key={step.id}>
            <Link
              sx={{ mb: 1.25 }}
              css={classes.wrap}
              component={RouterLink}
              to={step.url}>
              <ArrowBackIcon />
              <Typography
                component='h2'
                variant='h6'>
                {convertToSentenceCase(step.id)}&nbsp;
              </Typography>
            </Link>
            {step.values &&
              Object.entries(step.values).map(([fieldName, fieldValue]) => (
                <Box
                  key={fieldName}
                  sx={{ p: 1 }}>
                  <span css={classes.fieldName}>
                    {convertToSentenceCase(fieldName)}:&nbsp;
                  </span>
                  <span css={classes.fieldValue}>
                    {renderFieldValue(fieldName, fieldValue)}
                  </span>
                </Box>
              ))}
          </Paper>
        ))}
    </div>
  );
}
