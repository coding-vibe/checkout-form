import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const title = (theme: Theme) => css`
  margin-bottom: 20px;
  color: ${theme.palette.primary.dark};
  text-align: center;
`;

export const fields = (theme: Theme) => css`
  height: auto;
  margin: 60px auto;
  border-radius: 20px;
  background-color: #8ae9b3;
  background-image: linear-gradient(315deg, #8ae9b3 0%, #c8d6e5 74%);
  box-shadow: 15px 10px 10px rgb(85, 87, 96, 0.1);

  ${theme.breakpoints.up('md')} {
    max-width: 600px;
    padding: 100px;
  }

  ${theme.breakpoints.down('md')} {
    width: 450px;
    padding: 60px;
  }

  ${theme.breakpoints.down('sm')} {
    width: 475px;
    padding: 60px;
  }

  ${theme.breakpoints.down('xs')} {
    width: 325px;
    padding: 40px;
  }
`;

export const wrap = css`
  display: flex;
  gap: 75px;
`;

export const field = css`
  & .MuiInputBase-colorPrimary {
    border-radius: 10px;
  }
`;
