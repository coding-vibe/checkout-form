import FormScreens from 'constants/formScreens';

interface FormScreen<SubmitValues, InitialValues = Record<string, never>> {
  initialValues: InitialValues;
  onSubmit: (values: SubmitValues) => void;
  screen: FormScreens;
}

export default FormScreen;
