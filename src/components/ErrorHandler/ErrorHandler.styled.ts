import styled from 'styled-components';

export const ErrorWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: ${({ theme }) => theme.heights.mainContentDesktop};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: ${({ theme }) => theme.heights.mainContentMobile};
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
