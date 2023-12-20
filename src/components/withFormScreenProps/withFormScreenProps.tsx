import { useContext, FC } from 'react';
import Button from '@mui/material/Button';
import WizardFormContext from 'contexts/WizardFormContext';
import DefaultRedirect from 'components/DefaultRedirect';
import StepComponentProps from 'types/formScreen';
import * as classes from './styles';

function withFormScreenProps<StepValues extends object>(
  Component: FC<StepComponentProps<StepValues>>,
) {
  function FormScreen() {
    const { onSaveScreenValues, currentStep } = useContext(WizardFormContext);

    if (!currentStep) {
      return <DefaultRedirect />;
    }

    return (
      <div>
        <Component
          initialValues={currentStep.values as Partial<StepValues>}
          onSubmit={onSaveScreenValues<StepValues>}
          screen={currentStep.id}
        />
        <div css={classes.buttonWrap}>
          <Button
            form={currentStep.id}
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
}

export default withFormScreenProps;
