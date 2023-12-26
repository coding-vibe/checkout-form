import { css } from '@emotion/react';
import { Theme } from '@mui/material';
import { darken } from '@mui/system';

export const mainTitle = (theme: Theme) => css`
  color: ${theme.palette.primary.dark};
  text-align: center;
  font-family: 'Oswald';

  ${theme.breakpoints.up('sm')} {
    margin-bottom: 40px;
  }

  ${theme.breakpoints.down('sm')} {
    margin-bottom: 20px;
  }
`;

export const wrap = (theme: Theme) => css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-decoration: none;

  &:hover {
    color: ${darken(theme.palette.primary.main, 0.8)};
    text-decoration: underline;
  }
`;

export const fieldName = (theme: Theme) => css`
  color: ${theme.palette.primary.light};
`;

export const fieldValue = css`
  word-wrap: break-word;
`;
