import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import WizardFormContext from 'contexts/WizardFormContext';
import FormScreens from 'constants/formScreens';

export default function DefaultRedirect() {
  const { firstUncompletedStep, values } = useContext(WizardFormContext);
  const successStep = values.find(
    (value) => value.id === FormScreens.FORM_SUCCESS,
  );

  if (!firstUncompletedStep && successStep) {
    return <Navigate to={successStep.url} />;
  }
  if (firstUncompletedStep) {
    return <Navigate to={firstUncompletedStep.url} />;
  }
}
