import { css } from '@emotion/react';
import { Theme } from '@mui/material';

const MOBILE_BREAKPOINT = 400;

export const title = (theme: Theme) => css`
  margin-bottom: 20px;
  color: ${theme.palette.primary.dark};
  text-align: center;
  font-family: 'Oswald';
`;

export const fields = (theme: Theme) => css`
  max-width: 400px;
  height: auto;
  margin: 60px auto;
  padding: 35px;
  border-radius: 20px;
  background-color: #8ae9b3;
  background-image: linear-gradient(315deg, #8ae9b3 0%, #c8d6e5 74%);
  box-shadow: 15px 10px 10px rgb(85, 87, 96, 0.1);

  ${theme.breakpoints.up(MOBILE_BREAKPOINT)} {
    padding: 35px;
  }

  ${theme.breakpoints.down(MOBILE_BREAKPOINT)} {
    padding: 25px;
  }
`;

export const wrap = (theme: Theme) => css`
  display: flex;

  ${theme.breakpoints.up(MOBILE_BREAKPOINT)} {
    gap: 75px;
  }

  ${theme.breakpoints.down(MOBILE_BREAKPOINT)} {
    gap: 10px;
  }
`;

export const field = css`
  & .MuiInputBase-colorPrimary {
    border-radius: 10px;
  }
`;
