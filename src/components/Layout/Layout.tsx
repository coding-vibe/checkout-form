import { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import FormScreens from 'constants/formScreens';
import routes from 'constants/routes';
import WizardFormContext from 'contexts/WizardFormContext';
import Entries from 'types/entries';
import { FormValuesType } from 'types/formTypes';

interface StepType {
  step: FormScreens;
  isCompleted: boolean;
  url: string;
}

export default function Layout() {
  const { formValues } = useContext(WizardFormContext);
  const location = useLocation();

  const getMenuItemsFormStep = (formValues: FormValuesType): StepType[] => {
    // https://www.charpeni.com/blog/properly-type-object-keys-and-object-entries
    const menuItemsList = (
      Object.entries(formValues) as Entries<typeof formValues>
    )
      .sort((a, b) => {
        const orderA = a[1].order;
        const orderB = b[1].order;

        return orderA - orderB;
      })
      .map(([screen, step]) => {
        const { isCompleted } = step;
        const url = routes[screen];

        return { isCompleted, step: screen, url };
      })
      .reduce<StepType[]>((accumulator, element) => {
        const { step } = element;

        if (
          step === FormScreens.DELIVERY_MODE ||
          step === FormScreens.PAYMENT_METHOD
        ) {
          const subStep = formValues[step]?.subStep;

          if (subStep) {
            const menuItem = {
              isCompleted: false,
              step: subStep.id,
              url: routes[subStep.id],
            };
            accumulator.push(element, menuItem);
          } else {
            accumulator.push(element);
          }
        } else {
          accumulator.push(element);
        }

        return accumulator;
      }, []);

    return menuItemsList;
  };

  const formStepList = getMenuItemsFormStep(formValues);

  const getActiveStep = (path: string): number =>
    formStepList.findIndex((step) => step.url === path);

  return (
    <div>
      <Stepper
        activeStep={getActiveStep(location.pathname)}
        orientation='vertical'>
        {formStepList.map((step) => (
          <Step key={step.step}>
            <StepLabel>
              <Link to={step.url}>{step.step}</Link>
            </StepLabel>
            <StepContent />
          </Step>
        ))}
      </Stepper>
      <Outlet />
    </div>
  );
}
