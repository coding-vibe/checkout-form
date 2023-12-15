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
    <div css={classes.mainWrap}>
      <div css={classes.wrap}>
        <div css={classes.navigatorWrap}>
          <AppNavigator css={classes.navigator} />
        </div>
        <div css={classes.contentWrap}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
