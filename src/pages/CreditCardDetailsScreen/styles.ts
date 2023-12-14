import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const title = (theme: Theme) => css`
  color: ${theme.palette.primary.dark};
  text-align: center;
`;

export const fields = css`
  width: 450px;
  margin-bottom: 20px;
  padding: 40px;
  border-radius: 20px;
  background-color: #8ae9b3;
  background-image: linear-gradient(315deg, #8ae9b3 0%, #c8d6e5 74%);
  box-shadow: 15px 10px 10px rgb(85, 87, 96, 0.1);
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
