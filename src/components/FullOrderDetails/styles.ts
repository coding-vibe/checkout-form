import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const mainTitle = (theme: Theme) => css`
  margin: 40px 0px 16px;
  padding: 10px;
  color: ${theme.palette.primary.dark};
  font-size: 22px;
  text-transform: capitalize;
`;

export const wrap = css`
  display: flex;
  align-items: center;
`;

export const title = css`
  font-size: 16px;
  text-transform: capitalize;
`;

export const fieldName = (theme: Theme) => css`
  color: ${theme.palette.primary.light};
  font-size: 15px;
  text-transform: capitalize;
`;

export const fieldValue = css`
  font-size: 17px;
`;
