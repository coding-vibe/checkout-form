import FormScreens from 'constants/formScreens';

interface StepComponentProps<Values> {
  initialValues?: Partial<Values>;
  onSubmit: (values: Values) => void;
  screen: FormScreens;
}

export default StepComponentProps;
