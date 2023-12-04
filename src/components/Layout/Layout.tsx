import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AppNavigator from 'components/AppNavigator';
import FormScreens from 'constants/formScreens';
import routes from 'constants/routes';
import WizardFormContext from 'contexts/WizardFormContext';
import Entries from 'types/entries';
import { FormValuesType } from 'types/formTypes';
import MenuItemType from 'types/menuItem';

export default function Layout() {
  const { formValues } = useContext(WizardFormContext);
  const { pathname } = useLocation();

  const getMenuItemsFromSteps = (formValues: FormValuesType): MenuItemType[] =>
    // https://www.charpeni.com/blog/properly-type-object-keys-and-object-entries
    (Object.entries(formValues) as Entries<typeof formValues>)
      .sort((a, b) => {
        const [, { order: orderA }] = a;
        const [, { order: orderB }] = b;

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
          accumulator.push(element);

          if (subStep) {
            const menuItem = {
              isCompleted: subStep.isCompleted,
              step: subStep.id,
              url: routes[subStep.id],
            };
            accumulator.push(menuItem);
          }
        }

        return accumulator;
      }, []);
  const menuItemsList = getMenuItemsFromSteps(formValues);

  const getFirstUncompletedStepIndex = (): number => {
    const index = menuItemsList.findIndex((step) => !step.isCompleted);

    return index;
  };

  const firstUncompletedStep = getFirstUncompletedStepIndex();

  if (pathname === routes.ROOT) {
    return (
      <Navigate
        replace
        to={menuItemsList[firstUncompletedStep].url}
      />
    );
  }

  return (
    <div>
      <AppNavigator
        firstUncompletedStep={firstUncompletedStep}
        list={menuItemsList}
      />
      <Outlet />
    </div>
  );
}
