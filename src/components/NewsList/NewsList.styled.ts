import styled from 'styled-components';
import HourGlass from '../../assets/hour-glass.svg?react';

export const NewsListWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 24px;
  gap: 18px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(1, 1fr);
    padding: 16px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const LoaderWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: calc(100vh - (88px + 64px));
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: calc(100vh - (72px + 48px));
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
