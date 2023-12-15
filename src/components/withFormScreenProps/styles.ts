import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const wrap = css`
  position: relative;
`;

export const title = (theme: Theme) => css`
  color: ${theme.palette.primary.dark};
  text-align: center;
`;

export const buttonWrap = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;