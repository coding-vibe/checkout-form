import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const stepper = (theme: Theme) => css`
  & .MuiStepConnector-root {
    min-height: 100px;
  }

  & .MuiStepConnector-line {
    min-height: 90px;
  }

  & .MuiSvgIcon-root {
    font-size: 30px;
  }

  ${theme.breakpoints.down('sm')} {
    display: none;
  }
`;
