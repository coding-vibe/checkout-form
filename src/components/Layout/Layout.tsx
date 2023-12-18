import { useContext } from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import StepIcon from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import FormPersister from 'components/FormPersister';
import WizardFormContext from 'contexts/WizardFormContext';
import * as classes from './styles';

export default function Layout() {
  const { isInitialized } = useContext(WizardFormContext);
  const { values, firstUncompletedStep, currentStep } =
    useContext(WizardFormContext);
  const activeStepIndex = currentStep ? values.indexOf(currentStep) : -1;

  return (
    <div>
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
