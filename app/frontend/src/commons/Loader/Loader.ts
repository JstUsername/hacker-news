<<<<<<<< HEAD:app/frontend/src/commons/Loader/Loader.ts
import styled from 'styled-components';
import HourGlass from '~/assets/icons/hour-glass-icon.svg?react';
========
import HourGlass from '../../assets/hour-glass.svg?react';
import styled from 'styled-components';

export const NewsListWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 24px;
  gap: 18px;
  box-sizing: border-box;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: ${({ theme }) => theme.heights.mainContentDesktop};
    grid-template-rows: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: ${({ theme }) => theme.heights.mainContentMobile};
    grid-template-columns: repeat(1, 1fr);
    padding: 16px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
>>>>>>>> 0bb5e18 (feat(turborepo, express, sequelize, postgresql, husky): реализован монорепозиторий, добавлена основа для серверной части, перенастроены конфигурации eslint, prettier, typescript, добавлен docker-compose с БД):app/frontend/src/components/NewsList/NewsList.styled.ts

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
