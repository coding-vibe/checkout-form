import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const wrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-top: 100px;
`;

export const titleBox = css`
  display: flex;
  align-items: center;
`;

export const icon = css`
  font-size: 40px;
`;

export const image = css`
  height: 400px;
  width: 400px;
`;

export const title = css`
  margin: 0;
  font-size: 40px;
  text-transform: uppercase;
`;

export const mainText = css`
  font-size: 20px;
`;

export const text = (theme: Theme) => css`
  color: ${theme.palette.primary.dark};
  font-size: 18px;
  font-style: italic;
`;
