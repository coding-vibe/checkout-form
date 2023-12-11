import { useContext, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import WizardFormContext from 'contexts/WizardFormContext';

export default function FormPersister() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { formValues, onSaveFormValues } = useContext(WizardFormContext);
  const [isSpinnerShown, setIsSpinnerShown] = useState<boolean>(true);

  useEffect(() =>
    localStorage.setItem('Context value', JSON.stringify(formValues)),
  );

  useEffect(() => {
    const localStorageData = localStorage.getItem('Context value');
    if (localStorageData) {
      setIsSpinnerShown(false);
    }

    // localStorage.clear();
  }, []);

  return isSpinnerShown && <CircularProgress />;
}
