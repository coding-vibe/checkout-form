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
  const {
    currentStep,
    firstUncompletedStep,
    isInitialized,
    onSaveScreenValues,
    values,
  } = useContext(WizardFormContext);
  const navigate = useNavigate();
  const activeStepIndex = currentStep ? values.indexOf(currentStep) : -1;

  const handleBack = () => {
    onSaveScreenValues();
    navigate(values[activeStepIndex - 1].url);
  };

  const handleNext = () => {
    navigate(values[activeStepIndex + 1].url);
  };

  return (
    <div css={classes.mainBox}>
      {isInitialized && (
        <div css={classes.mainWrap}>
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
                nextButton={
                  <Button
                    disabled={activeStepIndex === values.length - 1}
                    onClick={handleNext}
                    size='small'>
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
                steps={values.length}
                variant='progress'
              />
            </div>
            <div css={classes.contentWrap}>
              <Outlet />
            </div>
          </div>
        </div>
      )}
      <FormPersister />
    </div>
  );
}
