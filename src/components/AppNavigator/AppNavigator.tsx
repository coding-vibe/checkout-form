import { useContext, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import FormScreens from 'constants/formScreens';
import routes from 'constants/routes';
import WizardFormContext from 'contexts/WizardFormContext';
import Entries from 'types/entries';
import { FormValuesType } from 'types/formTypes';

interface MenuItemType {
  step: FormScreens;
  isCompleted: boolean;
  url: string;
}

export default function AppNavigator() {
  const { formValues } = useContext(WizardFormContext);
  const location = useLocation();
  const navigate = useNavigate();

  const getMenuItemsFromSteps = (
    formValues: FormValuesType,
  ): MenuItemType[] => {
    // https://www.charpeni.com/blog/properly-type-object-keys-and-object-entries
    const menuItemsList = (
      Object.entries(formValues) as Entries<typeof formValues>
    )
      .sort((a, b) => {
        const { order: orderA } = a[1];
        const { order: orderB } = b[1];

        return orderA - orderB;
      })
      .map(([screen, step]) => {
        const { isCompleted } = step;
        const url = routes[screen];

        return { isCompleted, step: screen, url };
      })
      .reduce<MenuItemType[]>((accumulator, element) => {
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

  const menuItemsList = getMenuItemsFromSteps(formValues);

  const getActiveMenuItem = (path: string): number => {
    const index = menuItemsList.findIndex((step) => step.url === path);

    if (index === -1) {
      throw new Error('Menu item not found');
    }

    return index;
  };

  // Hook for trying prevent rerendering because of using useNavigate - https://github.com/remix-run/react-router/discussions/8465
  // const useNavigateRef = () => {
  //   const navigate = useNavigate();
  //   const navRef = useRef(navigate);

  //   useEffect(() => {
  //     navRef.current = navigate;
  //   }, [navigate]);

  //   return navRef;
  // };

  // const navigateRef = useNavigateRef();

  // Error in console: Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
  useEffect(() => {
    const firstUncompletedStep = menuItemsList.find(
      (step) => !step.isCompleted && step,
    );

    if (firstUncompletedStep) {
      navigate(firstUncompletedStep.url);
    }
  }, [menuItemsList, navigate]);

  return (
    <div>
      <Stepper
        activeStep={getActiveMenuItem(location.pathname)}
        orientation='vertical'>
        {menuItemsList.map((step) => (
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
