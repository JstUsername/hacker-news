import styled from 'styled-components';

export const NewsItemWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 24px;
  gap: 18px;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: calc(100vh - (88px + 64px));
    grid-template-rows: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: calc(100vh - (72px + 48px));
    padding: 16px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 1fr);
  }
`;
