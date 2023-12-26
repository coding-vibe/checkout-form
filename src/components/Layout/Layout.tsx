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
import convertToSentenceCase from 'utils/convertToSentenceCase';
import FormScreens from 'constants/formScreens';
import WizardFormContext from 'contexts/WizardFormContext';
import { Step } from 'types/step';
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

  const isLastStep = !!activeStepIndex && activeStepIndex === values.length - 1;

  const stepsToShow = values.filter(
    ({ id }) => id !== FormScreens.FORM_SUCCESS,
  );

  const formatStepName = (step: Step) =>
    step.id === FormScreens.FORM_SUBMISSION
      ? 'Review order'
      : convertToSentenceCase(step.id);

  return (
    <div>
      {isInitialized && (
        <div>
          <div css={classes.stepperWrap}>
            <Stepper
              activeStep={activeStepIndex}
              css={classes.desktopStepper}
              orientation='vertical'>
              {stepsToShow.map((step) => (
                <StepIcon key={step.id}>
                  <StepLabel>
                    {((firstUncompletedStep && step.isCompleted) ||
                      step.id === firstUncompletedStep?.id) &&
                    !isLastStep ? (
                      <Link
                        component={RouterLink}
                        to={step.url}
                        css={classes.bold}
                        underline='hover'
                        variant='h6'>
                        {formatStepName(step)}
                      </Link>
                    ) : (
                      <Typography
                        component='span'
                        variant='h6'>
                        {formatStepName(step)}
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
                  disabled={isLastStep}
                  size='small'
                  type='submit'>
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  disabled={activeStepIndex === 0 || isLastStep}
                  onClick={handleBack}
                  size='small'>
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </div>
          <div css={classes.outerContentWrap}>
            <div css={classes.innerContentWrap}>
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
