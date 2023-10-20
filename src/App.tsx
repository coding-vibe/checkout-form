import WizardFormProvider from 'components/WizardFormProvider';
import PersonalDetailsScreen from 'pages/PersonalDetailsScreen';

function App() {
  return (
    <WizardFormProvider>
      <PersonalDetailsScreen />
    </WizardFormProvider>
  );
}

export default App;
