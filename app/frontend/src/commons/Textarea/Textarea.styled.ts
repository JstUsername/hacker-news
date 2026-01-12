import styled from 'styled-components';
import { Text } from '~/commons/Text';

export const TextareaWrapper = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledTextarea = styled('textarea')`
  all: unset;
  ${({ theme }) => theme.typography.body2};
  box-sizing: border-box;
  padding: 12px 16px;
  background: ${({ theme }) => theme.color.backgroundDark};
  border: 1px solid ${({ theme }) => theme.color.green};
  color: ${({ theme }) => theme.color.green};
  transition: border-color 0.2s;
  resize: vertical;
  max-height: 120px;

  &:focus {
    border-color: ${({ theme }) => theme.color.yellow};
    outline: none;
  }

  &:hover {
    border-color: ${({ theme }) => theme.color.yellow};
  }

  &::placeholder {
    opacity: 0.2;
    color: ${({ theme }) => theme.color.green};
  }
`;

export const TextareaActions = styled('div')`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  align-items: flex-start;
`;

export const TextareaButton = styled('button')<{ $variant?: 'primary' | 'secondary' }>`
  all: unset;
  ${({ theme }) => theme.typography.body2};
  flex: 1;
  text-align: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: opacity 0.2s;
  border: 1px solid ${({ $variant, theme }) => ($variant === 'primary' ? theme.color.green : theme.color.yellow)};
  background: ${({ $variant, theme }) => ($variant === 'primary' ? theme.color.green : 'transparent')};
  color: ${({ $variant, theme }) => ($variant === 'primary' ? theme.color.backgroundDark : theme.color.yellow)};

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.5;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: unset;
  }
`;

export const TextAreaErrorText = styled(Text)`
  margin-right: auto;
  color: ${({ theme }) => theme.color.error};
`;
