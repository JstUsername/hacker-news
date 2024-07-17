import styled from 'styled-components';

export const NewsListItemWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  padding: 24px;
  background: ${({ theme }) => theme.color.backgroundLightTransparent};
  cursor: pointer;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 16px;
  }
`;

export const NewsTitle = styled('h1')`
  ${({ theme }) => theme.typography.h1};
  margin: 0;
  word-break: break-word;
  color: ${({ theme }) => theme.color.purple};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 24px;
  }
`;

export const CardBottom = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PointsWrapper = styled('div')`
  display: flex;
  flex: 1;
`;

export const UserTimeAgoWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Points = styled('span')`
  ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.color.yellow};
`;

export const By = styled('span')`
  ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.color.green};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const User = styled('span')`
  ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.color.green};
`;

export const TimeAgo = styled('span')`
  ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.color.green};
`;
