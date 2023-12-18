import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const title = (theme: Theme) => css`
  color: ${theme.palette.primary.dark};
  text-align: center;

  ${theme.breakpoints.down('sm')} {
    font-size: 21px;
  }
`;

export const fieldset = css`
  margin: 0;
  padding-left: 0;
  border: none;
`;

export const legend = css`
  font-weight: 600;
`;
