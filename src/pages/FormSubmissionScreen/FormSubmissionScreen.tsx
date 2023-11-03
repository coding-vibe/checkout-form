import { useContext } from 'react';
import WizardFormContext from 'contexts/WizardFormContext';

export default function FormSubmissionScreen() {
  const { formValues } = useContext(WizardFormContext);

  return <div></div>;
}
