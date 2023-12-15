import { useContext, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import FORM_STATE from 'constants/formState';
import WizardFormContext from 'contexts/WizardFormContext';
import { FormValuesType } from 'types/formTypes';
import * as classes from './styles';

interface Props {
  isInitialized: boolean;
  onInitializationComplete: () => void;
}

export default function FormPersister({
  isInitialized,
  onInitializationComplete,
}: Props) {
  const { formValues, onSaveFormValues } = useContext(WizardFormContext);

  useEffect(() => {
    if (!isInitialized) {
      const localStorageData = localStorage.getItem(FORM_STATE);

      if (localStorageData) {
        const parsedLocalStorageData = JSON.parse(
          localStorageData,
        ) as FormValuesType;

        onSaveFormValues(parsedLocalStorageData);
      }

      onInitializationComplete();
    }
  }, [onInitializationComplete, onSaveFormValues, isInitialized]);

  useEffect(() => {
    // TODO: Add error handling
    if (isInitialized) {
      localStorage.setItem(FORM_STATE, JSON.stringify(formValues));
    }
  }, [formValues, isInitialized]);

  return (
    <Backdrop
      css={classes.overlay}
      open={!isInitialized}>
      <CircularProgress size={100} />
    </Backdrop>
  );
}
