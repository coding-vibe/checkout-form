import { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import MenuItemType from 'types/menuItem';
import { Typography } from '@mui/material';

interface Props {
  className?: string;
  list: MenuItemType[];
  firstUncompletedStep: number;
}

export default function AppNavigator({
  className,
  firstUncompletedStep,
  list,
}: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentStepIndex = (path: string) =>
      list.findIndex((item) => item.url === path);

    const currentStep = getCurrentStepIndex(pathname);

    if (
      pathname !== list[firstUncompletedStep].url &&
      currentStep > firstUncompletedStep
    ) {
      navigate(list[firstUncompletedStep].url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, pathname]);

  return (
    <Stepper
      activeStep={firstUncompletedStep}
      css={className}
      orientation='vertical'>
      {list.map((step, index) => (
        <Step key={step.step}>
          <StepLabel>
            {step.isCompleted || index === firstUncompletedStep ? (
              <Link
                component={RouterLink}
                to={step.url}
                underline='hover'
                variant='overline'>
                {step.step}
              </Link>
            ) : (
              <Typography
                component='span'
                variant='overline'>
                {step.step}
              </Typography>
            )}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

AppNavigator.defaultProps = {
  className: null,
};
