import { Navigate, Routes as ReactRoutes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import routes from 'constants/routes';
import CreditCardDetailsScreen from 'pages/CreditCardDetailsScreen';
import DeliveryModeScreen from 'pages/DeliveryModeScreen';
import FormSubmissionScreen from 'pages/FormSubmissionScreen';
import PaymentMethodScreen from 'pages/PaymentMethodScreen';
import PersonalDetailsScreen from 'pages/PersonalDetailsScreen';

function App() {
  return (
    <ReactRoutes>
      <Route
        element={<Layout />}
        path={routes.ROOT}>
        <Route
          element={
            <Navigate
              to={routes.PERSONAL_DETAILS}
              replace
            />
          }
          index
        />
        <Route
          element={<CreditCardDetailsScreen />}
          path={routes.CREDIT_CARD_DETAILS}
        />
        <Route
          element={<DeliveryModeScreen />}
          path={routes.DELIVERY_MODE}
        />
        <Route
          element={<FormSubmissionScreen />}
          path={routes.FORM_SUBMISSION}
        />
        <Route
          element={<PaymentMethodScreen />}
          path={routes.PAYMENT_METHOD}
        />
        <Route
          element={<PersonalDetailsScreen />}
          path={routes.PERSONAL_DETAILS}
        />
      </Route>
    </ReactRoutes>
  );
}

export default App;
