import FormScreens from 'constants/formScreens';

const initialFormValues = {
  [FormScreens.PERSONAL_DETAILS]: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumbers: [],
  },
};

export default initialFormValues;
