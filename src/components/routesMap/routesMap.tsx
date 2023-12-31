import { createHashRouter } from 'react-router-dom';
import Layout from 'components/Layout';
import routes from 'constants/routes';
import CourierDeliveryDetailsScreen from 'pages/CourierDeliveryDetailsScreen';
import CreditCardDetailsScreen from 'pages/CreditCardDetailsScreen';
import DeliveryModeScreen from 'pages/DeliveryModeScreen';
import FormSubmissionScreen from 'pages/FormSubmissionScreen';
import FormSubmissionSuccessScreen from 'pages/FormSubmissionSuccessScreen';
import PaymentMethodScreen from 'pages/PaymentMethodScreen';
import PersonalDetailsScreen from 'pages/PersonalDetailsScreen';
import PostDeliveryDetailsScreen from 'pages/PostDeliveryDetailsScreen';
import WizardFormProvider from 'components/WizardFormProvider';
import DefaultRedirect from 'components/DefaultRedirect';
import FormPersister from 'components/FormPersister';

const routesMap = createHashRouter([
  {
    path: routes.ROOT,
    element: (
      <WizardFormProvider>
        <Layout />
        <FormPersister />
      </WizardFormProvider>
    ),
    children: [
      {
        element: <CourierDeliveryDetailsScreen />,
        path: routes.COURIER_DELIVERY_DETAILS,
      },
      {
        element: <CreditCardDetailsScreen />,
        path: routes.CREDIT_CARD_DETAILS,
      },
      {
        element: <DeliveryModeScreen />,
        path: routes.DELIVERY_MODE,
      },
      {
        element: <FormSubmissionScreen />,
        path: routes.FORM_SUBMISSION,
      },
      {
        element: <FormSubmissionSuccessScreen />,
        path: routes.FORM_SUCCESS,
      },
      {
        element: <PaymentMethodScreen />,
        path: routes.PAYMENT_METHOD,
      },
      {
        element: <PersonalDetailsScreen />,
        path: routes.PERSONAL_DETAILS,
      },
      {
        element: <PostDeliveryDetailsScreen />,
        path: routes.POST_DELIVERY_DETAILS,
      },
      {
        element: <DefaultRedirect />,
        path: '*',
      },
    ],
  },
]);

export default routesMap;
