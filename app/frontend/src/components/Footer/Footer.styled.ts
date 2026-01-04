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
