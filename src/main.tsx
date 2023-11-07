import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';

import Routes from 'components/Routes';

import WizardFormProvider from 'components/WizardFormProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <WizardFormProvider>
          <Routes />
        </WizardFormProvider>
      </LocalizationProvider>
    </BrowserRouter>
  </StrictMode>,
);
