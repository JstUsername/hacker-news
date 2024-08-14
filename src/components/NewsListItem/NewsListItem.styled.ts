import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NewsListItemWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  padding: 24px;
  background: ${({ theme }) => theme.color.backgroundLightTransparent};
  text-decoration: none;

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
