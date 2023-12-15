import { useContext, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AppNavigator from 'components/AppNavigator';
import FormPersister from 'components/FormPersister';
import routes from 'constants/routes';
import WizardFormContext from 'contexts/WizardFormContext';
import * as classes from './styles';

export default function Layout() {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
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
      {isInitialized && (
        <>
          <AppNavigator css={classes.navigator} />
          <Outlet />
        </>
      )}
      <FormPersister
        onInitializationComplete={() => setIsInitialized(true)}
        isInitialized={isInitialized}
      />
    </div>
  );
}
