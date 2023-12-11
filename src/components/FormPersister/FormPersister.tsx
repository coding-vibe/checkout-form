import { useContext, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import WizardFormContext from 'contexts/WizardFormContext';
import { FormValuesType } from 'types/formTypes';

export default function FormPersister() {
  const { formValues, onSaveFormValues } = useContext(WizardFormContext);
  const [isSpinnerShown, setIsSpinnerShown] = useState<boolean>(true);

  useEffect(() => {
    const localStorageData = localStorage.getItem('Context value');
    if (localStorageData) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const parsedLocalStorageData: FormValuesType =
        JSON.parse(localStorageData);
      onSaveFormValues(parsedLocalStorageData);
      setIsSpinnerShown(false);
    }

    return () => {
      setIsSpinnerShown(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('Context value', JSON.stringify(formValues));
  }, [formValues]);

  return isSpinnerShown && <CircularProgress />;
}
