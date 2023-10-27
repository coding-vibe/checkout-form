import { css } from '@emotion/react';

export const form = css`
  margin-bottom: 20px;
  padding: 80px;
  border-radius: 20px;
  width: 450px;
  height: 150px;
  background-color: rgba(85, 87, 96, 0.2);
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
