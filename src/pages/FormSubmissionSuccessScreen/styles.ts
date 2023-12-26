import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const wrap = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  ${theme.breakpoints.up('md')} {
    padding: 0;
  }

  ${theme.breakpoints.down('md')} {
    padding: 0px 10px;
  }
`;

export const image = css`
  display: block;
  max-width: 300px;
  height: auto;
`;

export const titleBox = css`
  display: flex;
  align-items: center;
`;

export const title = (theme: Theme) => css`
  margin: 0;
  font-weight: 700;

  ${theme.breakpoints.up('sm')} {
    font-size: 40px;
  }

  ${theme.breakpoints.down('sm')} {
    font-size: 30px;
  }

  ${theme.breakpoints.down('xs')} {
    font-size: 20px;
  }
`;

export const icon = (theme: Theme) => css`
  ${theme.breakpoints.up('sm')} {
    font-size: 40px;
  }

  ${theme.breakpoints.down('sm')} {
    font-size: 30px;
  }

  ${theme.breakpoints.down('xs')} {
    font-size: 20px;
  }
`;

export const mainText = (theme: Theme) => css`
  text-align: center;

  ${theme.breakpoints.up('lg')} {
    font-size: 20px;
  }

  ${theme.breakpoints.down('lg')} {
    font-size: 18px;
  }

  ${theme.breakpoints.down('md')} {
    font-size: 14px;
  }
`;

export const text = (theme: Theme) => css`
  color: ${theme.palette.primary.dark};
  text-align: center;
  font-style: italic;

  ${theme.breakpoints.up('xl')} {
    font-size: 18px;
  }

  ${theme.breakpoints.down('xl')} {
    font-size: 16px;
  }

  ${theme.breakpoints.down('md')} {
    font-size: 14px;
  }
`;
