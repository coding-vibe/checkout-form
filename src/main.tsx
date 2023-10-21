import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'components/Routes';
import WizardFormProvider from 'components/WizardFormProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <WizardFormProvider>
        <Routes />
      </WizardFormProvider>
    </BrowserRouter>
  </StrictMode>,
);
