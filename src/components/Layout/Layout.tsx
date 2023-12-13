import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AppNavigator from 'components/AppNavigator';
import routes from 'constants/routes';
import WizardFormContext from 'contexts/WizardFormContext';
import * as classes from './styles';

export default function Layout() {
  const { firstUncompletedStep } = useContext(WizardFormContext);
  const { pathname } = useLocation();

  if (pathname === routes.ROOT) {
    return (
      <Navigate
        replace
        to={routes[firstUncompletedStep]}
      />
    );
  }

  return (
    <div>
      <AppNavigator css={classes.navigator} />
      <Outlet />
    </div>
  );
}
