import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import routesMap from 'components/routesMap';
import WizardFormProvider from 'components/WizardFormProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CssBaseline />
      <WizardFormProvider>
        <RouterProvider router={routesMap} />
      </WizardFormProvider>
    </LocalizationProvider>
  </StrictMode>,
);
