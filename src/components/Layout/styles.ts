import { css } from '@emotion/react';
import { Theme } from '@mui/material';

const STEPPER_WIDTH = '35%';

export const stepperWrap = (theme: Theme) => css`
  position: fixed;
  background-color: ${theme.palette.secondary.main};

  ${theme.breakpoints.up('sm')} {
    display: flex;
    justify-content: center;
    width: ${STEPPER_WIDTH};
    height: 100vh;
    padding: 40px 25px;
    border-right: 1px solid ${theme.palette.primary.main};
  }

  ${theme.breakpoints.down('sm')} {
    z-index: 1000;
  }
`;

export const desktopStepper = (theme: Theme) => css`
  ${theme.breakpoints.down('sm')} {
    display: none;
  }

  ${theme.breakpoints.up('sm')} {
    & .MuiStepConnector-root {
      display: flex;
    }

    & .MuiStepConnector-line {
      border-color: ${theme.palette.primary.light};
    }

    & .MuiSvgIcon-root {
      font-size: 25px;
    }
  }
`;

export const mobileStepper = (theme: Theme) => css`
  ${theme.breakpoints.up('sm')} {
    display: none;
  }

  ${theme.breakpoints.down('sm')} {
    display: flex;
    padding: 15px;
    background-color: ${theme.palette.secondary.main};
  }
`;

export const bold = css`
  font-family: 'Oswald';
  font-weight: 400;
`;

export const outerContentWrap = (theme: Theme) => css`
  ${theme.breakpoints.up('sm')} {
    padding-left: ${STEPPER_WIDTH};
  }
`;

export const innerContentWrap = (theme: Theme) => css`
  max-width: 900px;
  margin: 0 auto;

  ${theme.breakpoints.up('sm')} {
    padding: 40px;
  }

  ${theme.breakpoints.down('sm')} {
    padding: 25px 20px 75px;
  }
`;
