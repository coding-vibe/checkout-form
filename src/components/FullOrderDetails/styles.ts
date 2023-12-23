import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const mainTitle = (theme: Theme) => css`
  margin-bottom: 20px;
  padding: 10px;
  color: ${theme.palette.primary.dark};
  text-align: center;
  font-family: 'Oswald';
`;

export const wrap = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;

  ${theme.breakpoints.up('sm')} {
    flex-direction: row;
  }

  ${theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

export const fieldName = (theme: Theme) => css`
  color: ${theme.palette.primary.light};
`;

export const fieldValue = css`
  word-wrap: break-word;
`;
