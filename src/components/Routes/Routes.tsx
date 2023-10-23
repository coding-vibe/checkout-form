import { Navigate, Routes as ReactRoutes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import DeliveryModeScreen from 'pages/DeliveryModeScreen';
import PersonalDetailsScreen from 'pages/PersonalDetailsScreen';
import routes from 'constants/routes';

function App() {
  return (
    <ReactRoutes>
      <Route
        path={routes.ROOT}
        element={<Layout />}>
        <Route
          index
          element={
            <Navigate
              to={routes.PERSONAL_DETAILS}
              replace
            />
          }
        />
        <Route
          path={routes.PERSONAL_DETAILS}
          element={<PersonalDetailsScreen />}
        />
        <Route
          path={routes.DELIVERY_MODE}
          element={<DeliveryModeScreen />}
        />
      </Route>
    </ReactRoutes>
  );
}

export default App;
