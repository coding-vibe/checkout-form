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
import { FormStepsList, FormValuesType } from 'types/formTypes';

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

  useEffect(() => {
    const formScreen = (Object.keys(routes) as (keyof typeof routes)[]).find(
      (key) => routes[key] === pathname,
    );
    const getActiveStep = () => {
      // eslint-disable-next-line no-restricted-syntax
      for (const [screenName, step] of formValuesEntries) {
        if (screenName === formScreen) {
          return step;
        }
        if ('subStep' in step && !!step.subStep) {
          return step.subStep;
        }
      }
      throw new Error('Unknown step/substep');
    };

    const currentStep = getActiveStep();
    if (!currentStep.isCompleted && formScreen !== firstUncompletedStep) {
      navigate(routes[firstUncompletedStep]);
    }
  }, [firstUncompletedStep, formValuesEntries, navigate, pathname]);

  const getActiveMenuItemIndex = () =>
    Object.values<FormStepsList>(formValues).reduce<number>(
      (accumulator, step) => {
        let updatedAccumulator = accumulator;
        if (step.isCompleted) {
          updatedAccumulator += 1;

          if ('subStep' in step && step.subStep?.isCompleted) {
            updatedAccumulator += 1;
          }
        }

        return updatedAccumulator;
      },
      0,
    );

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
