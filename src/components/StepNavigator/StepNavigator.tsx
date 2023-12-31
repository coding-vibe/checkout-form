import { useContext, useEffect } from 'react';
import { useBlocker, useNavigate } from 'react-router-dom';
import { useFormState } from 'react-final-form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material';
import WizardFormContext from 'contexts/WizardFormContext';

export default function StepNavigator() {
  const { firstUncompletedStep } = useContext(WizardFormContext);
  const formState = useFormState();
  const navigate = useNavigate();

  const isMobileDevice = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname &&
      formState.dirty &&
      !formState.submitSucceeded,
  );

  useEffect(() => {
    if (blocker.state === 'blocked' && formState.submitSucceeded) {
      blocker.reset();
    }
  }, [blocker, formState.submitSucceeded]);

  useEffect(() => {
    if (formState.submitSucceeded && firstUncompletedStep) {
      navigate(firstUncompletedStep.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstUncompletedStep, formState.submitSucceeded]);

  return blocker.state === 'blocked' ? (
    <Dialog
      open
      onClose={() => blocker?.reset()}
      fullScreen={isMobileDevice}>
      <DialogTitle>Are you sure you want to leave?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You have made changes. They will be lost if you continue.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => blocker?.proceed()}>Leave</Button>
        <Button
          onClick={() => blocker?.reset()}
          variant='contained'>
          Stay
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
}
