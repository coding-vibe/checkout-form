import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const wrap = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  ${theme.breakpoints.up('md')} {
    padding: 30px 0px;
  }

  ${theme.breakpoints.down('md')} {
    padding: 60px 0px;
  }
`;

export const titleBox = css`
  display: flex;
  align-items: center;
`;

export const icon = css`
  font-size: 40px;
`;

export const image = (theme: Theme) => css`
  ${theme.breakpoints.up('md')} {
    height: 400px;
    width: 400px;
  }

  ${theme.breakpoints.down('md')} {
    height: 300px;
    width: 300px;
  }
`;

export const title = css`
  margin: 0;
  font-size: 40px;
  text-transform: uppercase;
`;

export const mainText = (theme: Theme) => css`
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
