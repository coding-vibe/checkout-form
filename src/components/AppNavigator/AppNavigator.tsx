import { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import MenuItemType from 'types/menuItem';

interface Props {
  menuItemsList: MenuItemType[];
  firstUncompletedStep: number;
  className?: string;
}

export default function AppNavigator({
  firstUncompletedStep,
  menuItemsList,
  className,
}: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentStepIndex = (path: string) =>
      menuItemsList.findIndex((item) => item.url === path);

    const currentStep = getCurrentStepIndex(pathname);

    if (currentStep > firstUncompletedStep) {
      navigate(menuItemsList[firstUncompletedStep].url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstUncompletedStep, menuItemsList, pathname]);

  useEffect(() => {
    console.log('Check form state here');
    navigate(menuItemsList[firstUncompletedStep].url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstUncompletedStep, menuItemsList]);

  return (
    <Stepper
      activeStep={firstUncompletedStep}
      css={className}
      orientation='vertical'>
      {menuItemsList.map((menuItem, index) => (
        <Step key={menuItem.step}>
          <StepLabel>
            {menuItem.isCompleted || index === firstUncompletedStep ? (
              <Link
                component={RouterLink}
                to={menuItem.url}
                underline='hover'
                variant='overline'>
                {menuItem.step}
              </Link>
            ) : (
              <Typography
                component='span'
                variant='overline'>
                {menuItem.step}
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
