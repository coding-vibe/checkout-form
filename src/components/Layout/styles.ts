import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const mainWrap = css`
  min-height: 100vh;
`;

export const wrap = css`
  position: relative;
  width: 1000px;
`;

export const navigatorWrap = (theme: Theme) => css`
  width: 300px;
  min-height: 100vh;
  padding: 120px 60px;
  border-right: 1px solid ${theme.palette.primary.main};
  background-color: ${theme.palette.secondary.main};
`;

export const navigator = css`
  position: fixed;
`;

export const contentWrap = css`
  position: absolute;
  left: 400px;
  top: 15%;
  width: 100%;
`;
