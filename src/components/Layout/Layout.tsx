import { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import FormScreens from 'constants/formScreens';
import routes from 'constants/routes';
import WizardFormContext from 'contexts/WizardFormContext';
import { FormValuesType } from 'types/formTypes';

const STEPS = Object.keys(FormScreens);

interface StepType {
  step: FormScreens;
  isCompleted: boolean;
  url: string;
}

type ScreensType = FormValuesType[keyof FormValuesType];

export default function Layout() {
  const { formValues } = useContext(WizardFormContext);

  const createStepList = (formValues: FormValuesType): StepType[] => {
    const stepList = Object.entries<ScreensType>(formValues)
      .sort((a, b) => {
        const orderA = a[1].order;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const orderB = b[1].order;

        return orderA - orderB;
      })
      .map(([screen, step]) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { isCompleted } = step;
        const url = routes[screen as FormScreens];

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return { isCompleted, step: screen as FormScreens, url };
      });

    return stepList;
  };

  const appendSubstepsToSteps = createStepList(formValues).reduce(
    (accumulator, element) => {
      const { step } = element;

      if (
        (step === FormScreens.DELIVERY_MODE ||
          element.step === FormScreens.PAYMENT_METHOD) &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        formValues[step]?.subStep
      ) {
        const subStep = {
          isCompleted: false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          step: formValues[step].subStep.id,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          url: routes[formValues[step].subStep?.id],
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        accumulator.push(element, subStep);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        accumulator.push(element);
      }

      return accumulator;
    },
    [],
  );

  console.log(appendSubstepsToSteps);

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
            <StepLabel>
              <Link to={routes[step as FormScreens]}> {step}</Link>
            </StepLabel>
            <StepContent />
          </Step>
        ))}
      </Stepper>
      <Outlet />
    </div>
  );
}
