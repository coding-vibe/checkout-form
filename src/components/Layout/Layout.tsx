import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import FormScreens from 'constants/formScreens';
import routes from 'constants/routes';

const STEPS = Object.keys(FormScreens);

function getActiveStep(path: string) {
  switch (path) {
    case '/personal-details':
      return 0;
    case '/delivery-mode':
      return 1;
    case '/courier-delivery':
      return 2;
    case '/post-office-delivery':
      return 3;
    case '/payment-method':
      return 4;
    case '/form-submission':
      return 5;
    case '/form-success':
      return 6;
    default:
      return 0;
  }
}

export default function Layout() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <Stepper
      activeStep={getActiveStep(location.pathname)}
      orientation='vertical'>
      {STEPS.map((step, index) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
          <StepContent>
            <Outlet />
            <Navigate to={routes[step as FormScreens]} />
            <Box sx={{ mb: 2 }}>
              <div>
                <Button
                  variant='contained'
                  // onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}>
                  {index === STEPS.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button
                  disabled={index === 0}
                  // onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
}
