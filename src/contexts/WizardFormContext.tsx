import { createContext } from 'react';
import initialContextValue from 'constants/initialContextValue';

const WizardFormContext =
  createContext<typeof initialContextValue>(initialContextValue);

export default WizardFormContext;
