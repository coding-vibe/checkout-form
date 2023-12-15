import { useContext, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import MobileStepper from '@mui/material/MobileStepper';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import FormScreens from 'constants/formScreens';
import routes from 'constants/routes';
import WizardFormContext from 'contexts/WizardFormContext';
import Entries from 'types/entries';
import { FormStepsList, FormValuesType } from 'types/formTypes';
import * as classes from './styles';

interface Props {
  className?: string;
}

export default function AppNavigator({ className }: Props) {
  const { formValues, firstUncompletedStep } = useContext(WizardFormContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const maxSteps = 10;
  // https://www.charpeni.com/blog/properly-type-object-keys-and-object-entries
  const formValuesEntries = Object.entries(
    formValues,
  ) as Entries<FormValuesType>;

  useEffect(() => {
    const formScreen = (Object.keys(routes) as (keyof typeof routes)[]).find(
      (key) => routes[key] === pathname,
    );

    const predicate = (screenName: FormScreens, step: FormStepsList) => {
      if (screenName === formScreen || ('subStep' in step && !!step.subStep)) {
        return true;
      }
      throw new Error('Unknown step/substep');
    };

    const getStep = (
      values: Entries<FormValuesType>,
      predicate: (screenName: FormScreens, step: FormStepsList) => boolean,
    ): [FormScreens, FormStepsList] => {
      // eslint-disable-next-line no-restricted-syntax
      for (const [screenName, step] of values) {
        if (predicate(screenName, step)) {
          return [screenName, step];
        }
      }
      throw new Error('Step/substep by condition not found');
    };

    const getActiveStep = () => {
      const [screenName, step] = getStep(formValuesEntries, predicate);
      if (screenName === formScreen) {
        return step;
      }
      if ('subStep' in step && !!step.subStep) {
        return step.subStep;
      }
      throw new Error('Unknown step/substep');
    };

    const currentStep = getActiveStep();
    if (
      !currentStep ||
      (!currentStep.isCompleted && formScreen !== firstUncompletedStep)
    ) {
      navigate(routes[firstUncompletedStep]);
    }
  }, [firstUncompletedStep, formValuesEntries, navigate, pathname]);

  const getActiveMenuItemIndex = () =>
    // https://github.com/microsoft/TypeScript/issues/15300
    Object.values<FormStepsList>({ ...formValues }).reduce<number>(
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
    <div>
      <Stepper
        activeStep={getActiveMenuItemIndex()}
        className={className}
        css={classes.stepper}
        orientation='vertical'>
        {renderMenuItemList}
      </Stepper>
      <MobileStepper
        variant='text'
        steps={maxSteps}
        position='static'
        activeStep={getActiveMenuItemIndex()}
        nextButton={
          <Button
            size='small'
            // onClick={handleNext}
            disabled={getActiveMenuItemIndex() === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size='small'
            // onClick={handleBack}
            disabled={getActiveMenuItemIndex() === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
}

AppNavigator.defaultProps = {
  className: null,
};
