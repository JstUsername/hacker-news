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
