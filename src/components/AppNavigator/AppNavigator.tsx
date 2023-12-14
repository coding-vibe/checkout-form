import { useContext, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import FormScreens from 'constants/formScreens';
import routes from 'constants/routes';
import WizardFormContext from 'contexts/WizardFormContext';
import Entries from 'types/entries';
import { FormValuesType } from 'types/formTypes';

interface Props {
  className?: string;
}

export default function AppNavigator({ className }: Props) {
  const { formValues, firstUncompletedStep } = useContext(WizardFormContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // https://www.charpeni.com/blog/properly-type-object-keys-and-object-entries
  const formValuesEntries = Object.entries(
    formValues,
  ) as Entries<FormValuesType>;
  type FormValuesKeys = keyof typeof formValues;
  type FormStepsList = (typeof formValues)[FormValuesKeys];

  useEffect(() => {
    const formScreen = (Object.keys(routes) as (keyof typeof routes)[]).find(
      (key) => routes[key] === pathname,
    );
    const findStep = () => {
      // eslint-disable-next-line no-restricted-syntax
      for (const [screenName, step] of formValuesEntries) {
        if (screenName === formScreen) {
          return step;
        }
        if (step.subStep) {
          return step.subStep;
        }
      }
      throw new Error('Step/substep not found');
    };

    const currentStep = findStep();
    if (!currentStep.isCompleted && formScreen !== firstUncompletedStep) {
      navigate(routes[firstUncompletedStep]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstUncompletedStep, pathname, navigate]);

  const getActiveMenuItemIndex = () => {
    let result = 0;

    // eslint-disable-next-line no-restricted-syntax
    for (const step of Object.values<FormStepsList>(formValues)) {
      if (!step.isCompleted) {
        break;
      }

      result += 1;
    }

    return result;
  };

  const renderMenuItem = (
    screenName: FormScreens,
    step: { isCompleted: boolean },
  ): JSX.Element => (
    <Step key={screenName}>
      <StepLabel>
        {step.isCompleted || screenName === firstUncompletedStep ? (
          <Link
            component={RouterLink}
            to={routes[screenName]}
            underline='hover'
            variant='overline'>
            {screenName}
          </Link>
        ) : (
          <Typography
            component='span'
            variant='overline'>
            {screenName}
          </Typography>
        )}
      </StepLabel>
    </Step>
  );

  const renderMenuItemList = formValuesEntries.reduce<JSX.Element[]>(
    (prev, [screenName, step]) =>
      'subStep' in step && step.subStep
        ? [
            ...prev,
            renderMenuItem(screenName, step),
            renderMenuItem(step.subStep.id, step.subStep),
          ]
        : [...prev, renderMenuItem(screenName, step)],
    [],
  );

  return (
    <Stepper
      activeStep={getActiveMenuItemIndex()}
      css={className}
      orientation='vertical'>
      {renderMenuItemList}
    </Stepper>
  );
}

AppNavigator.defaultProps = {
  className: null,
};
