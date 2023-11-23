import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { ARRAY_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { TextField } from 'mui-rff';
import withFormHandler from 'components/withFormHandler';
import PhoneField from 'components/PhoneField';
import FormScreens from 'constants/formScreens';
import FormScreen from 'types/formScreen';
import {
  PersonalDetailsSubmitValues,
  PersonalDetailsInitialValues,
} from 'types/personalDetails';
import {
  composeValidators,
  validateEmail,
  validateIsRequired,
  validatePhoneNumber,
} from 'utils/validation';

const phoneNumbersLimits = { MIN: 1, MAX: 3 };

interface Props<SubmitValues, InitialValues>
  extends FormScreen<SubmitValues, InitialValues> {}

function PersonalDetailsScreen<SubmitValues, InitialValues>({
  initialValues,
  onSubmit,
  screen,
}: Props<SubmitValues, InitialValues>) {
  const validateForm = (values: PersonalDetailsSubmitValues) => {
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
    <Form<SubmitValues, SubmitValues | InitialValues | undefined>
      initialValues={initialValues}
      onSubmit={onSubmit}
      mutators={{
        ...arrayMutators,
      }}
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
                  type='button'>
                  Add phone number
                </Button>
              </div>
            )}
          </FieldArray>
        </form>
      )}
    />
  );
}

withFormHandler<PersonalDetailsSubmitValues, PersonalDetailsInitialValues>({
  screen: FormScreens.PERSONAL_DETAILS,
})(PersonalDetailsScreen);
