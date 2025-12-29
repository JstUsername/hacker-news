import styled from 'styled-components';
import HourGlass from '~/assets/icons/hour-glass-icon.svg?react';

export const LoaderWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: ${({ theme }) => theme.heights.mainContentDesktop};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: ${({ theme }) => theme.heights.mainContentMobile};
  }
`;

export const Loader = styled(HourGlass)`
  position: absolute;
  height: 48px;
  width: 48px;
  fill: ${({ theme }) => theme.color.yellow};
  animation: rotate-center 0.75s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite both;
  transform-box: fill-box;
  transform-origin: center;

  @keyframes rotate-center {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(180deg);
    }
  }
`;
