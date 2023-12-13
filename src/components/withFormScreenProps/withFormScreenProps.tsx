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
      const editedScreen = screen.toLocaleLowerCase();

      const getComponentTitle = (screen: Screens) => {
        switch (screen) {
          case FormScreens.PERSONAL_DETAILS:
            return `Provide your ${editedScreen}`;
          case FormScreens.DELIVERY_MODE:
            return `Choose ${editedScreen}`;
          case FormScreens.PAYMENT_METHOD:
            return `Choose ${editedScreen}`;
          case FormScreens.COURIER_DELIVERY_DETAILS:
            return `Provide ${editedScreen}`;
          case FormScreens.POST_DELIVERY_DETAILS:
            return `Provide ${editedScreen}`;
          case FormScreens.CREDIT_CARD_DETAILS:
            return `Provide ${editedScreen}`;
          case FormScreens.FORM_SUBMISSION:
            return null;
          default:
            throw new Error('Unknown screen');
        }
      };

      return (
        <div css={classes.wrap}>
          <h2 css={classes.title}>{getComponentTitle(screen)}</h2>
          <Component
            initialValues={getInitialValues()}
            onSubmit={handleSubmit}
            screen={screen}
          />
          <Button
            css={classes.button}
            form={screen}
            type='submit'
            variant='contained'>
            Next step
          </Button>
        </div>
      );
    }

    FormScreen.displayName = `withFormProps(${Component.name})`;

    return FormScreen;
  };
}

export default withFormScreenProps;
