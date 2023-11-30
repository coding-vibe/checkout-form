import FormScreens from 'constants/formScreens';

interface FormScreenProps<SubmitValues, InitialValues = undefined | object> {
  initialValues?: InitialValues;
  onSubmit: (values: SubmitValues) => void;
  screen: FormScreens;
}

export default FormScreenProps;
