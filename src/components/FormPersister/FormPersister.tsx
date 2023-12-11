import { useContext, useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import WizardFormContext from 'contexts/WizardFormContext';
import { FormValuesType } from 'types/formTypes';

const LOCAL_STORAGE_KEY = 'Context value';

export default function FormPersister() {
  const { formValues, onSaveFormValues } = useContext(WizardFormContext);
  const [isInitialized, setIsInitialized] = useState<boolean>(true);

  useEffect(() => {
    const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localStorageData) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const parsedLocalStorageData: FormValuesType =
        JSON.parse(localStorageData);
      onSaveFormValues(parsedLocalStorageData);
    }
    setIsInitialized(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // TODO: Failure of localStorage manipulations should be handled; error handling not in the scope of the PR
    if (!isInitialized) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formValues));
    }
  }, [formValues, isInitialized]);

  return (
    isInitialized && (
      <Backdrop
        open
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
    )
  );
}
