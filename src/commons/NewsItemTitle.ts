import styled from 'styled-components';

export const NewsItemTitle = styled('h1')`
  ${({ theme }) => theme.typography.h1};
  margin: 0;
  word-break: break-word;
  color: ${({ theme }) => theme.color.purple};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 24px;
  }
`;

export const NewsItemTitleAdditional = styled('span')`
  color: ${({ theme }) => theme.color.green};
`;
