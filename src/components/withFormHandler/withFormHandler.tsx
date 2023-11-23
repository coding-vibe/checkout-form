import { useContext } from 'react';
import Button from '@mui/material/Button';
import WizardFormContext, {
  ParentScreens,
  Screens,
  SubmitFormValuesType,
} from 'contexts/WizardFormContext';
import FormScreens from 'constants/formScreens';

interface ComponentConfigProps {
  screen: Screens;
  parentScreen?: ParentScreens;
}

const withFormHandler =
  <SubmitFormValues, InitialFormValues>({
    screen,
    parentScreen,
  }: ComponentConfigProps) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (Component) =>
  // eslint-disable-next-line react/function-component-definition
  () => {
    const { formValues, onSaveFormValues } = useContext(WizardFormContext);

    const handleSubmit = (
      values: SubmitFormValuesType<Omit<FormScreens, FormScreens.FORM_SUCCESS>>,
    ) => {
      // eslint-disable-next-line no-debugger
      debugger;
      onSaveFormValues(screen, values, parentScreen);
    };

    const getInitialValues = (): InitialFormValues =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      parentScreen
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          formValues[parentScreen].subStep?.values
        : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          formValues[screen].values;

    return (
      <>
        <Component<SubmitFormValues, InitialFormValues>
          initialValues={getInitialValues()}
          onSubmit={handleSubmit}
          screen={screen}
        />
        <Button
          form={screen}
          type='submit'
          variant='contained'>
          Next step
        </Button>
      </>
    );
  };

export default withFormHandler;
