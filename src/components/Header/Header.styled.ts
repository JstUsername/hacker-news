import styled from 'styled-components';
import Logo from '../../assets/logo.svg?react';
import CroppedLogo from '../../assets/logo-cropped.svg?react';

export const HNLogo = styled(Logo)`
  display: block;
  flex-shrink: 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const CroppedHNLogo = styled(CroppedLogo)`
  display: none;
  flex-shrink: 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: block;
  }
`;

export const StyledHeader = styled('header')`
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
    gap: 16px;
  }
`;

export const LinkWrapper = styled('div')`
  display: flex;
  gap: 24px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 18px;
  }
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

export const StyledLink = styled('a')`
  cursor: pointer;
  text-decoration: none;
  ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.color.green};
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;
