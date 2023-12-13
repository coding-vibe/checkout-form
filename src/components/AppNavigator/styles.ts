import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const stepper = (theme: Theme) => css`
  ${theme.breakpoints.down('md')} {
    display: none;
  }
`;
