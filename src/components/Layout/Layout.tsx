import { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import FormScreens from 'constants/formScreens';
import routes from 'constants/routes';
import WizardFormContext from 'contexts/WizardFormContext';

const STEPS = Object.keys(FormScreens);

export default function Layout() {
  const { formValues } = useContext(WizardFormContext);

  function getActiveStep(path: string) {
    switch (path) {
      case routes.PERSONAL_DETAILS:
        return formValues.PERSONAL_DETAILS.order;
      case routes.DELIVERY_MODE:
        return formValues.DELIVERY_MODE.order;
      case routes.PAYMENT_METHOD:
        return formValues.PAYMENT_METHOD.order;
      case routes.FORM_SUBMISSION:
        return formValues.FORM_SUBMISSION.order;
      case routes.FORM_SUCCESS:
        return formValues.FORM_SUCCESS.order;
      default:
        return formValues.PERSONAL_DETAILS.order;
    }
  }

  const location = useLocation();

  return (
    <div>
      <Stepper
        activeStep={getActiveStep(location.pathname)}
        orientation='vertical'>
        {STEPS.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
            <StepContent>
              <Navigate to={routes[step as FormScreens]} />
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <Outlet />
    </div>
  );
}
