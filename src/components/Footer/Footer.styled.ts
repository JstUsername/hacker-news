import styled from 'styled-components';

export const StyledFooter = styled('footer')`
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  gap: 24px;
  background: ${({ theme }) => theme.color.background};
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 16px 18px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: space-between;
  }
`;

export const StyledLink = styled('a')`
  cursor: pointer;
  text-decoration: none;
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.color.green};
  &:hover {
    text-decoration: underline;
  }
`;

export const ApiLink = styled('a')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  text-decoration: none;
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.color.green};
  &:hover {
    text-decoration: underline;
  }
`;
