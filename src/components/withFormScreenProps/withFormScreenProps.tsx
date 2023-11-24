import { useContext, FC } from 'react';
import Button from '@mui/material/Button';
import WizardFormContext, {
  ParentScreens,
  Screens,
} from 'contexts/WizardFormContext';
import FormScreens from 'constants/formScreens';
import checkScreenIsNotSubStep from 'utils/checkScreenIsNotSubStep';

interface WrapperProps {
  screen: Screens;
  parentScreen?: ParentScreens;
}

interface WrappedFormScreenProps<S> {
  initialValues?: object;
  onSubmit: (values: object) => void;
  screen: S;
}

type WrappedComponentType<S extends FormScreens> = FC<
  WrappedFormScreenProps<S>
>;

function withFormScreenProps({ screen, parentScreen }: WrapperProps) {
  return (Component: WrappedComponentType<WrapperProps['screen']>) => {
    function FormScreen() {
      const { formValues, onSaveFormValues } = useContext(WizardFormContext);

      const handleSubmit = (values: object) =>
        onSaveFormValues(screen, values, parentScreen);

      const getInitialValues = () => {
        if (parentScreen) {
          return formValues[parentScreen].subStep?.values;
        }

        if (checkScreenIsNotSubStep(screen, parentScreen)) {
          return formValues[screen].values;
        }

        throw new Error(
          `Cannot retrieve initial values for screen ${screen} without parent`,
        );
      };

      return (
        <>
          <Component
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
    }

    FormScreen.displayName = `withFormProps${FormScreen.name}`;

    return FormScreen;
  };
}

export default withFormScreenProps;