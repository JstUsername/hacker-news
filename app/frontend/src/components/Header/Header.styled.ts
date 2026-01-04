import styled from 'styled-components';
import AvatarIcon from '~/assets/icons/avatar-icon.svg?react';
import CroppedLogo from '~/assets/logos/logo-cropped.svg?react';
import Logo from '~/assets/logos/logo.svg?react';

export const HNLogo = styled(Logo)`
  display: block;
  flex-shrink: 0;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const CroppedHNLogo = styled(CroppedLogo)`
  display: none;
  flex-shrink: 0;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: block;
  }
`;

export const StyledHeader = styled('header')`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  gap: 24px;
  background: ${({ theme }) => theme.color.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 16px;
  }
`;

export const HeaderActions = styled('div')`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 18px;
  }
`;

export const StyledLink = styled('a')`
  display: inline-flex;
  cursor: pointer;
  text-decoration: none;
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.color.green};

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const ProfileButton = styled('button')`
  width: fit-content;
  height: fit-content;
  background: transparent;
  border: none;
  padding: 0;
`;

export const StyledAvatarIcon = styled(AvatarIcon)`
  cursor: pointer;

  path {
    transition: fill 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover path {
    fill: ${({ theme }) => theme.color.yellow};
  }
`;
