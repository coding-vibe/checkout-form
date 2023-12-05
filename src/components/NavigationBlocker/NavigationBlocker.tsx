import { useBlocker } from 'react-router-dom';
import { useFormState } from 'react-final-form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function NavigationBlocker() {
  const formState = useFormState();
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      formState.dirty &&
      formState.invalid &&
      currentLocation.pathname !== nextLocation.pathname,
  );

  return blocker.state === 'blocked' ? (
    <Dialog open={!!blocker}>
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
