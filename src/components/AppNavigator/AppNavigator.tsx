import { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';

import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import MenuItemType from 'types/menuItem';
import * as classes from './styles';

interface Props {
  list: MenuItemType[];
  firstUncompletedStep: number;
  className?: string;
}

export default function AppNavigator({
  list,
  firstUncompletedStep,
  className,
}: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const maxSteps = 10;

  useEffect(() => {
    if (pathname !== list[firstUncompletedStep].url) {
      navigate(list[firstUncompletedStep].url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, pathname]);

  return (
    <div>
      <Stepper
        activeStep={firstUncompletedStep}
        className={className}
        css={classes.stepper}
        orientation='vertical'>
        {list.map((step) => (
          <Step key={step.step}>
            <StepLabel>
              <Link
                component={RouterLink}
                to={step.url}
                underline='hover'
                variant='subtitle2'>
                {step.step}
              </Link>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <MobileStepper
        variant='text'
        steps={maxSteps}
        position='static'
        activeStep={firstUncompletedStep}
        nextButton={
          <Button
            size='small'
            // onClick={handleNext}
            disabled={firstUncompletedStep === maxSteps - 1}>
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
            disabled={firstUncompletedStep === 0}>
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
