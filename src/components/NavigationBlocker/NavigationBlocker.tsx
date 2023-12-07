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
  console.log('Check in blocker component');
  console.log(formState);
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    console.log('Check inside useBlocker');
    console.log(formState);

    return (
      formState.dirty && currentLocation.pathname !== nextLocation.pathname
    );
  });

  return blocker.state === 'blocked' ? (
    <Dialog open>
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
