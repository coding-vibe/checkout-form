import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const title = (theme: Theme) => css`
  margin-bottom: 20px;
  color: ${theme.palette.primary.dark};
  text-align: center;
  font-family: 'Oswald';
`;

export const fieldset = css`
  margin: 0;
  padding-left: 0;
  border: none;
`;

export const legend = css`
  font-weight: 600;
`;
