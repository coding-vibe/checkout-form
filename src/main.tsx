import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Routes from 'components/Routes';

import WizardFormProvider from 'components/WizardFormProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <WizardFormProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Routes />
        </LocalizationProvider>
      </WizardFormProvider>
    </BrowserRouter>
  </StrictMode>,
);
