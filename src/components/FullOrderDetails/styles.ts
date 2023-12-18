import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const mainTitle = (theme: Theme) => css`
  padding: 10px;
  color: ${theme.palette.primary.dark};
  text-align: center;
  text-transform: capitalize;

  ${theme.breakpoints.up('sm')} {
    margin: 40px 0px 16px;
    font-size: 22px;
  }

  ${theme.breakpoints.down('sm')} {
    margin-top: 0px;
    font-size: 21px;
  }

  ${theme.breakpoints.down('xs')} {
    font-size: 20px;
  }
`;

export const wrap = (theme: Theme) => css`
  display: flex;
  align-items: center;

  ${theme.breakpoints.up('sm')} {
    flex-direction: row;
  }

  ${theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

export const title = (theme: Theme) => css`
  text-transform: capitalize;

  ${theme.breakpoints.up('sm')} {
    font-size: 16px;
  }

  ${theme.breakpoints.down('sm')} {
    font-size: 15px;
  }

  ${theme.breakpoints.down('xs')} {
    font-size: 11px;
  }
`;

export const fieldName = (theme: Theme) => css`
  color: ${theme.palette.primary.light};
  text-transform: capitalize;

  ${theme.breakpoints.up('sm')} {
    font-size: 15px;
  }

  ${theme.breakpoints.down('sm')} {
    font-size: 14px;
  }

  ${theme.breakpoints.down('xs')} {
    font-size: 11px;
  }
`;

export const fieldValue = (theme: Theme) => css`
  ${theme.breakpoints.up('sm')} {
    font-size: 17px;
  }

  ${theme.breakpoints.down('sm')} {
    font-size: 15px;
    word-wrap: break-word;
  }

  ${theme.breakpoints.down('xs')} {
    font-size: 12px;
  }
`;
