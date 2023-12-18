import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const mainWrap = (theme: Theme) => css`
  min-height: 100vh;

  ${theme.breakpoints.down('sm')} {
    min-height: auto;
    border: 1px solid ${theme.palette.primary.main};
    background-color: ${theme.palette.secondary.main};
  }
`;

export const wrap = css`
  position: relative;
  max-width: 1000px;
`;

export const stepperWrap = (theme: Theme) => css`
  max-width: 320px;
  min-height: 100vh;
  border-right: 1px solid ${theme.palette.primary.main};
  background-color: ${theme.palette.secondary.main};

  ${theme.breakpoints.up('xl')} {
    padding: 120px 60px;
  }

  ${theme.breakpoints.down('xl')} {
    padding: 120px 50px;
  }

  ${theme.breakpoints.down('lg')} {
    padding: 120px 40px;
  }

  ${theme.breakpoints.down('sm')} {
    position: absolute;
    top: 100%;
    left: 35%;
    padding: 0px;
    border-right: inherit;
    background-color: inherit;
  }
`;

export const stepper = (theme: Theme) => css`
  position: fixed;

  & .MuiStepConnector-root {
    min-height: 100px;
  }

  & .MuiStepConnector-line {
    min-height: 90px;
    border-color: ${theme.palette.primary.light};
  }

  & .MuiSvgIcon-root {
    font-size: 30px;
  }

  ${theme.breakpoints.down('sm')} {
    display: none;
  }
`;

export const contentWrap = (theme: Theme) => css`
  position: absolute;
  top: 10%;
  padding: 0px 20px;

  ${theme.breakpoints.up('xl')} {
    left: 380px;
    width: 100%;
  }

  ${theme.breakpoints.down('xl')} {
    left: 350px;
    width: 85%;
  }

  ${theme.breakpoints.down('lg')} {
    width: 65%;
  }

  ${theme.breakpoints.up('md')} {
    padding: 0px 20px;
  }

  ${theme.breakpoints.down('md')} {
    left: 330px;
    width: 55%;
    padding: 0px 10px;
  }

  ${theme.breakpoints.down('md')} {
    left: 330px;
    width: 55%;
    padding: 0px 10px;
  }

  ${theme.breakpoints.down('sm')} {
    position: static;
    top: 0%;
    margin: 100px auto;
  }
`;
