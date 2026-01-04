import { Link } from 'react-router-dom';
import styled from 'styled-components';
import EyeCloseIcon from '~/assets/icons/eye-close-icon.svg?react';
import EyeIcon from '~/assets/icons/eye-icon.svg?react';
import { theme } from '~/theme';

export const FormContainer = styled('div')`
  width: 100%;
  min-height: ${({ theme }) => theme.heights.mainContentDesktop};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: ${({ theme }) => theme.heights.mainContentMobile};
    padding: 16px;
  }
`;

export const FormWrapper = styled('div')`
  width: 100%;
  max-width: 480px;
  background: ${({ theme }) => theme.color.background};
  padding: 32px;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 24px;
  }
`;

export const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormTitle = styled('div')`
  text-align: center;
  margin-bottom: 8px;
`;

export const FormField = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormLabel = styled('label')`
  ${({ theme }) => theme.typography.body1};
`;

export const FormInput = styled('input')<{ $withIcon?: boolean }>`
  all: unset;
  ${({ theme }) => theme.typography.body2};
  box-sizing: border-box;
  padding: 12px 16px;
  background: ${({ theme }) => theme.color.backgroundDark};
  border: 1px solid ${({ theme }) => theme.color.green};
  color: ${({ theme }) => theme.color.green};
  transition: border-color 0.2s;
  padding-right: ${({ $withIcon }) => ($withIcon ? '48px' : undefined)};

  &::placeholder {
    opacity: 0.2;
    color: ${({ theme }) => theme.color.green};
  }

  &:focus {
    border-color: ${({ theme }) => theme.color.yellow};
  }

  &:hover {
    border-color: ${({ theme }) => theme.color.yellow};
  }
`;

export const SubmitButton = styled('button')`
  all: unset;
  min-height: 52px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 16px;
  background: ${({ theme }) => theme.color.green};
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;
  opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};

  &:hover {
    background: ${({ disabled, theme }) => (disabled ? undefined : theme.color.yellow)};
  }

  &:active {
    background: ${({ disabled, theme }) => (disabled ? undefined : theme.color.purple)};
  }
`;

export const FormFooter = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
`;

export const StyledLink = styled(Link)<{ color?: keyof typeof theme.color }>`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  ${({ theme }) => theme.typography.body1};
  color: ${({ color = 'green', theme }) => theme.color[color]};

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledEyeIcon = styled(EyeIcon)`
  position: absolute;
  opacity: 0.8;
  top: calc(20px + 8px + 12px);
  right: 12px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  path {
    fill: ${({ theme }) => theme.color.green};
  }
`;

export const StyledEyeCloseIcon = styled(EyeCloseIcon)`
  position: absolute;
  opacity: 0.8;
  top: calc(20px + 8px + 12px);
  right: 12px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  path {
    fill: ${({ theme }) => theme.color.green};
  }
`;
