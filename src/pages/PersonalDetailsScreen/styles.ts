import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const title = (theme: Theme) => css`
  color: ${theme.palette.primary.dark};
  text-align: center;
`;
