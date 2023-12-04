import { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import MenuItemType from 'types/menuItem';

interface Props {
  list: MenuItemType[];
  firstUncompletedStep: number;
}

export default function AppNavigator({ list, firstUncompletedStep }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== list[firstUncompletedStep].url) {
      navigate(list[firstUncompletedStep].url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, pathname]);

  return (
    <Stepper
      activeStep={firstUncompletedStep}
      orientation='vertical'>
      {list.map((step) => (
        <Step key={step.step}>
          <StepLabel>
            <Link
              component={RouterLink}
              to={step.url}>
              {step.step}
            </Link>
          </StepLabel>
          <StepContent />
        </Step>
      ))}
    </Stepper>
  );
}
