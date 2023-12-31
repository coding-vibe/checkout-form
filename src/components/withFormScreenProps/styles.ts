import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const title = (theme: Theme) => css`
  color: ${theme.palette.primary.dark};
  text-align: center;
`;

export const buttonWrap = (theme: Theme) => css`
  ${theme.breakpoints.up('sm')} {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  ${theme.breakpoints.down('sm')} {
    display: none;
  }
`;
