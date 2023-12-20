import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const mainTitle = (theme: Theme) => css`
  margin-bottom: 16px;
  padding: 10px;
  color: ${theme.palette.primary.dark};
  text-align: center;
  text-transform: capitalize;

  ${theme.breakpoints.up('sm')} {
    font-size: 22px;
  }

  ${theme.breakpoints.down('sm')} {
    font-size: 20px;
  }
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

export const title = css`
  text-transform: capitalize;
  font-size: 16px;
`;

export const fieldName = (theme: Theme) => css`
  color: ${theme.palette.primary.light};
  text-transform: capitalize;

  ${theme.breakpoints.up('xs')} {
    font-size: 15px;
  }

  ${theme.breakpoints.down('xs')} {
    font-size: 11px;
  }
`;

export const fieldValue = (theme: Theme) => css`
  word-wrap: break-word;

  ${theme.breakpoints.up('xs')} {
    font-size: 17px;
  }

  ${theme.breakpoints.down('xs')} {
    font-size: 12px;
  }
`;
