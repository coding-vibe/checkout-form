import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const checkbox = (theme: Theme) => css`
  ${theme.breakpoints.down('xs')} {
    & .MuiCheckbox-root {
      // TODO: Check why font size doesn't change
      font-size: 10px;
    }
  }
`;
