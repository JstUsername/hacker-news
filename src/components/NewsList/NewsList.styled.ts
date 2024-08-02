import styled from 'styled-components';
import HourGlass from '../../assets/hour-glass.svg?react';

export const NewsListWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 24px;
  gap: 18px;
  box-sizing: border-box;

  // @NOTE: 88px - высота header, 64px - высота footer (при ширине экрана ОТ 1024px)
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: calc(100vh - (88px + 64px));
    grid-template-rows: repeat(2, 1fr);
  }

  // @NOTE: 72px - высота header, 48px - высота footer (при ширине экрана ДО 1024px)
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: calc(100vh - (72px + 48px));
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

  // @NOTE: 88px - высота header, 64px - высота footer (при ширине экрана ОТ 1024px)
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: calc(100vh - (88px + 64px));
  }

  // @NOTE: 72px - высота header, 48px - высота footer (при ширине экрана ДО 1024px)
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
