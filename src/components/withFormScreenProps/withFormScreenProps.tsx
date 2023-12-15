import { useContext, FC } from 'react';
import Button from '@mui/material/Button';
import WizardFormContext from 'contexts/WizardFormContext';
import FormScreens from 'constants/formScreens';
import { ParentScreens, Screens } from 'types/formTypes';
import checkScreenIsNotSubStep from 'utils/checkScreenIsNotSubStep';
import * as classes from './styles';

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
      const { formValues, onSaveScreenValues } = useContext(WizardFormContext);

      const handleSubmit = (values: object) => {
        onSaveScreenValues(screen, values, parentScreen);
      };

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
        <div css={classes.wrap}>
          <Component
            initialValues={getInitialValues()}
            onSubmit={handleSubmit}
            screen={screen}
          />
          <div css={classes.buttonWrap}>
            <Button
              form={screen}
              type='submit'
              variant='contained'>
              Next step
            </Button>
          </div>
        </div>
      );
    }

    FormScreen.displayName = `withFormProps(${Component.name})`;

    return FormScreen;
  };
}

export default withFormScreenProps;
