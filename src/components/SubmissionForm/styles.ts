import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const checkbox = (theme: Theme) => css`
  ${theme.breakpoints.down('xs')} {
    & .MuiCheckbox-root {
      font-size: 10px;
    }
  }
`;
