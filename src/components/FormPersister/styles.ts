import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const overlay = (theme: Theme) => css`
  color: #fff;
  z-index: ${theme.zIndex.drawer + 1};
`;
