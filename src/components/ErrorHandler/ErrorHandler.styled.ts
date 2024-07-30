import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ErrorWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 18px;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: calc(100vh - (88px + 64px));
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: calc(100vh - (72px + 48px));
  }
`;

export const ErrorEmoji = styled('span')`
  ${({ theme }) => theme.typography.h1};
  font-size: 48px;
  color: ${({ theme }) => theme.color.purple};
`;

export const ErrorText = styled('h1')`
  ${({ theme }) => theme.typography.h1};
  margin: 0;
  color: ${({ theme }) => theme.color.green};
`;

export const HomeLink = styled(Link)`
  cursor: pointer;
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.color.yellow};
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    color: ${({ theme }) => theme.color.purple};
  }
  text-decoration: none;
`;
