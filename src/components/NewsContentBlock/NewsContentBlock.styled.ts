import styled from 'styled-components';

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

export const LinkToNewsWrapper = styled('span')`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.green};
  line-height: 1.6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LinkToNews = styled('a')`
  color: ${({ theme }) => theme.color.green};
  cursor: pointer;
  white-space: nowrap;
`;

export const Points = styled('span')`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.yellow};
`;

export const By = styled('span')`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.green};
`;

export const User = styled('span')`
  color: ${({ theme }) => theme.color.purple};
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
