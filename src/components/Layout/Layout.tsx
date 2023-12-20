import { useContext } from 'react';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import MobileStepper from '@mui/material/MobileStepper';
import StepIcon from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import FormPersister from 'components/FormPersister';
import WizardFormContext from 'contexts/WizardFormContext';
import * as classes from './styles';

export default function Layout() {
  const { currentStep, firstUncompletedStep, isInitialized, values } =
    useContext(WizardFormContext);
  const navigate = useNavigate();
  const activeStepIndex =
    currentStep && values.indexOf(currentStep) !== -1
      ? values.indexOf(currentStep)
      : undefined;

  const handleBack = () => {
    if (activeStepIndex) {
      navigate(values[activeStepIndex - 1].url);
    }
  };

  return (
    <div>
      {isInitialized && (
        <div css={classes.wrap}>
          <div css={classes.stepperWrap}>
            <Stepper
              activeStep={activeStepIndex}
              css={classes.stepper}
              orientation='vertical'>
              {values.map((step) => (
                <StepIcon key={step.id}>
                  <StepLabel>
                    {(firstUncompletedStep && step.isCompleted) ||
                    step.id === firstUncompletedStep?.id ? (
                      <Link
                        component={RouterLink}
                        to={step.url}
                        underline='hover'
                        variant='overline'>
                        {step.id}
                      </Link>
                    ) : (
                      <Typography
                        component='span'
                        variant='overline'>
                        {step.id}
                      </Typography>
                    )}
                  </StepLabel>
                </StepIcon>
              ))}
            </Stepper>
            <MobileStepper
              activeStep={activeStepIndex}
              css={classes.mobileStepper}
              steps={values.length}
              variant='progress'
              nextButton={
                <Button
                  form={currentStep?.id}
                  disabled={activeStepIndex === values.length - 1}
                  size='small'
                  type='submit'>
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  disabled={activeStepIndex === 0}
                  onClick={handleBack}
                  size='small'>
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </div>
          <div css={classes.contentWrap}>
            <Outlet />
          </div>
        </div>
      )}
      <FormPersister />
    </div>
  );
}
