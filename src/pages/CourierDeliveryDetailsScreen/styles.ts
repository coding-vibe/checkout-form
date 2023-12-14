import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const title = (theme: Theme) => css`
  color: ${theme.palette.primary.dark};
  text-align: center;
`;

export const fieldset = css`
  margin: 0;
  padding-left: 0;
  border: none;
`;
