import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { ARRAY_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import lowerCase from 'lodash/lowerCase';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import { TextField } from 'mui-rff';
import StepNavigator from 'components/StepNavigator';
import withFormHandler from 'components/withFormScreenProps';
import PhoneField from 'components/PhoneField';
import StepComponentProps from 'types/formScreen';
import PersonalDetailsValues from 'types/personalDetails';
import {
  composeValidators,
  validateEmail,
  validateIsRequired,
  validatePhoneNumber,
} from 'utils/validation';
import * as classes from './styles';

const phoneNumbersLimits = { MIN: 1, MAX: 3 };

type Props = StepComponentProps<PersonalDetailsValues>;

function PersonalDetailsScreen({ initialValues, onSubmit, screen }: Props) {
  const validateForm = (values: PersonalDetailsValues) => {
    let phoneNumberError;

    if (!values.phoneNumbers) {
      phoneNumberError = `Should be at least ${phoneNumbersLimits.MIN} phone number`;
    }

    if (
      values.phoneNumbers &&
      values.phoneNumbers.length > phoneNumbersLimits.MAX
    ) {
      phoneNumberError = `Should be not more than ${phoneNumbersLimits.MAX} phone numbers`;
    }

    return phoneNumberError
      ? { phoneNumbers: { [ARRAY_ERROR]: phoneNumberError } }
      : undefined;
  };

  return (
    <div>
      <Typography
        css={classes.title}
        component='h1'
        variant='h5'>
        Provide your {lowerCase(screen)}
      </Typography>
      <Form<PersonalDetailsValues>
        initialValues={initialValues}
        onSubmit={onSubmit}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mutators={arrayMutators}
        validate={validateForm}
        render={({ handleSubmit }) => (
          <form
            id={screen}
            onSubmit={handleSubmit}>
            <TextField
              fieldProps={{ validate: validateIsRequired }}
              label='First Name'
              name='firstName'
              placeholder='Enter first name'
              sx={{ mb: 2 }}
            />
            <TextField
              fieldProps={{ validate: validateIsRequired }}
              label='Last Name'
              name='lastName'
              placeholder='Enter last name'
              sx={{ mb: 2 }}
            />
            <TextField
              fieldProps={{
                validate: composeValidators(validateIsRequired, validateEmail),
              }}
              label='Email'
              name='email'
              placeholder='Enter email'
            />
            <FieldArray<string> name='phoneNumbers'>
              {({ fields, meta: { error, touched } }) => (
                <div>
                  {fields.map((name, index) => (
                    <div key={name}>
                      <PhoneField
                        fieldProps={{ validate: validatePhoneNumber }}
                        label={`Phone number ${index + 1}`}
                        name={name}
                        sx={{ mt: 2, '&:last-child': { mb: 2 } }}
                      />
                      <Button
                        onClick={() => fields.remove(index)}
                        size='small'
                        type='button'>
                        Remove
                      </Button>
                    </div>
                  ))}
                  {error && !Array.isArray(error) && touched && (
                    <FormHelperText error>{error}</FormHelperText>
                  )}
                  <Button
                    disabled={
                      !!fields.length && fields.length >= phoneNumbersLimits.MAX
                    }
                    onClick={() => fields.push('')}
                    sx={{ my: 2 }}
                    size='small'
                    type='button'>
                    Add phone number
                  </Button>
                </div>
              )}
            </FieldArray>
            <StepNavigator />
          </form>
        )}
      />
    </div>
  );
}

export default withFormHandler<PersonalDetailsValues>(PersonalDetailsScreen);
