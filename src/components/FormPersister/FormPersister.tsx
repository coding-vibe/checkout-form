import { useContext, useEffect } from 'react';
import parseJSON from 'date-fns/parseJSON';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import FORM_STATE from 'constants/formState';
import WizardFormContext, { ContextType } from 'contexts/WizardFormContext';
import checkIsISOString from 'utils/checkIsISOString';
import * as classes from './styles';

export default function FormPersister() {
  const { values, onSaveFormValues, isInitialized, onInitializationComplete } =
    useContext(WizardFormContext);
  const SPINNER_SIZE = 100;

  useEffect(() => {
    if (!isInitialized) {
      const localStorageData = localStorage.getItem(FORM_STATE);

      if (localStorageData) {
        const parsedLocalStorageData = JSON.parse(
          localStorageData,
          (_, value: unknown) =>
            typeof value === 'string' && checkIsISOString(value)
              ? parseJSON(value)
              : value,
        ) as ContextType['values'];

        onSaveFormValues(parsedLocalStorageData);
      }

      onInitializationComplete();
    }
  }, [onInitializationComplete, onSaveFormValues, isInitialized]);

  useEffect(() => {
    // TODO: Add error handling
    if (isInitialized) {
      localStorage.setItem(FORM_STATE, JSON.stringify(values));
    }
  }, [values, isInitialized]);

  return (
    <Backdrop
      css={classes.overlay}
      open={!isInitialized}>
      <CircularProgress size={SPINNER_SIZE} />
    </Backdrop>
  );
}
