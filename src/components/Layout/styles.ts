import { css } from '@emotion/react';
import { Theme } from '@mui/material';

export const wrap = (theme: Theme) => css`
  position: relative;
  max-width: 1200px;

  ${theme.breakpoints.up('sm')} {
    display: flex;
  }

  ${theme.breakpoints.down('sm')} {
    display: block;
  }
`;

export const stepperWrap = (theme: Theme) => css`
  background-color: ${theme.palette.secondary.main};

  ${theme.breakpoints.up('sm')} {
    min-width: 320px;
    min-height: 100vh;
    padding: 120px 60px;
    border-right: 1px solid ${theme.palette.primary.main};
  }

  ${theme.breakpoints.down('sm')} {
    max-width: 0px;
    min-height: 0px;
    padding: 0px;
    border-right: none;
  }
`;

export const stepper = (theme: Theme) => css`
  ${theme.breakpoints.up('sm')} {
    position: fixed;
    display: block;
    min-height: inherit;

    & .MuiStepConnector-root {
      min-height: 40px;
    }

    & .MuiStepConnector-line {
      min-height: 40px;
      border-color: ${theme.palette.primary.light};
    }

    & .MuiSvgIcon-root {
      font-size: 25px;
    }
  }

  ${theme.breakpoints.down('sm')} {
    display: none;
  }
`;

export const mobileStepper = (theme: Theme) => css`
  ${theme.breakpoints.up('sm')} {
    display: none;
    padding: 0;
    background-color: none;
  }

  ${theme.breakpoints.down('sm')} {
    display: flex;
    padding: 15px 30px;
    background-color: inherit;
  }
`;

export const contentWrap = (theme: Theme) => css`
  ${theme.breakpoints.up('md')} {
    padding: 120px 50px 0px;
  }

  ${theme.breakpoints.down('md')} {
    padding: 120px 20px 0px;
  }

  ${theme.breakpoints.up('sm')} {
    width: 100%;
    margin: 0;
  }

  ${theme.breakpoints.down('sm')} {
    padding: 50px 20px;
  }
`;
