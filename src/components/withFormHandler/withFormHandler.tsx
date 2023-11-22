import { useContext } from 'react';
import Button from '@mui/material/Button';
import WizardFormContext, {
  ParentScreens,
  Screens,
} from 'contexts/WizardFormContext';

interface ComponentConfigProps {
  screen: Screens;
  parentScreen?: ParentScreens;
}

const withFormHandler =
  ({ screen, parentScreen }: ComponentConfigProps) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <SubmitFormValues, InitialFormValues>(Component) =>
  // eslint-disable-next-line react/function-component-definition
  () => {
    const { formValues, onSaveFormValues } = useContext(WizardFormContext);

    const handleSubmit = (
      values: // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents, no-restricted-globals
      | (typeof formValues)[screen]['values']
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
        | (typeof formValues)[parentScreen]['subStep']['values'],
    ) => {
      onSaveFormValues(screen, values, parentScreen);
    };

    const getInitialValues = () =>
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
