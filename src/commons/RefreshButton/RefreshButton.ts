import styled from 'styled-components';

export const RefreshButton = styled('button')`
  border: none;
  background: none;
  cursor: pointer;
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.color.yellow};
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    color: ${({ theme }) => theme.color.purple};
  }
`;
