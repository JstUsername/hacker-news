import styled from 'styled-components';

export const InternalServerErrorWrapper = styled('div')`
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

export const InternalServerErrorEmoji = styled('div')`
  ${({ theme }) => theme.typography.h1};
  font-size: 48px;
  color: ${({ theme }) => theme.color.purple};
`;

export const InternalServerErrorText = styled('h1')`
  ${({ theme }) => theme.typography.h1};
  margin: 0;
  color: ${({ theme }) => theme.color.green};
`;

export const ButtonLink = styled('button')`
  border: none;
  background: none;
  cursor: pointer;
  ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.color.yellow};
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    color: ${({ theme }) => theme.color.purple};
  }
`;
