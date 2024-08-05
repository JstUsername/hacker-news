import styled from 'styled-components';

export const ErrorWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: ${({ theme }) => theme.height.max};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: ${({ theme }) => theme.height.min};
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
