import { useContext, useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import FORM_STATE from 'constants/formState';
import WizardFormContext from 'contexts/WizardFormContext';
import { FormValuesType } from 'types/formTypes';
import * as classes from './styles';

export default function FormPersister() {
  const { formValues, onSaveFormValues } = useContext(WizardFormContext);
  const [isInitialized, setIsInitialized] = useState<boolean>(true);

  useEffect(() => {
    const localStorageData = localStorage.getItem(FORM_STATE);
    if (localStorageData) {
      const parsedLocalStorageData = JSON.parse(
        localStorageData,
      ) as FormValuesType;
      onSaveFormValues(parsedLocalStorageData);
    }
    setIsInitialized(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // TODO: Add error handling
    if (!isInitialized) {
      localStorage.setItem(FORM_STATE, JSON.stringify(formValues));
    }
  }, [formValues, isInitialized]);

  return (
    isInitialized && (
      <Backdrop
        css={classes.overlay}
        open>
        <CircularProgress size={100} />
      </Backdrop>
    )
  );
}
