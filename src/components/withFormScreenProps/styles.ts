import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const wrap = css`
  position: relative;
`;

export const title = (theme: Theme) => css`
  color: ${theme.palette.primary.dark};
  text-align: center;
`;

export const button = css`
  position: absolute;
  right: 0;
  transform: translateY(-50%);
  margin-top: 30px;
`;
