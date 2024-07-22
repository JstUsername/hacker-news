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

export const ContentWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
  width: 100%;
  overflow: hidden;
  gap: 48px;
  padding: 24px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.color.backgroundLightTransparent};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 16px;
  }
`;

export const ContentHeaderWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

export const ContentBottomWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 24px;
`;

export const CommentsWrapper = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 24px;
  padding: 24px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.color.backgroundLightTransparent};
  overflow: auto;
  overflow-x: hidden;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 16px;
  }
`;

export const NewsItemTitle = styled('h1')`
  ${({ theme }) => theme.typography.h1};
  margin: 0;
  word-break: break-word;
  color: ${({ theme }) => theme.color.purple};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 24px;
  }
  span {
    color: ${({ theme }) => theme.color.green};
  }
`;

export const LinkToNews = styled('span')`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.green};
  line-height: 1.6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  a {
    color: ${({ theme }) => theme.color.green};
    cursor: pointer;
    white-space: nowrap;
  }
`;

export const Points = styled('span')`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.yellow};
`;

export const By = styled('span')`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.green};
  span {
    color: ${({ theme }) => theme.color.purple};
  }
`;

export const Time = styled('span')`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.yellow};
`;

export const ByTimeWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const CommentsLoaderWrapper = styled('div')`
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
