import styled from 'styled-components';
import { CommentsChildItemWrapperProps, ExpandIconProps } from './CommentsItem.types.ts';
import ArrowIcon from '../../assets/pixel-arrow.svg?react';

export const CommentsItemWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding-left: 12px;
  border-left: 1px solid ${({ theme }) => theme.color.yellow};
  gap: 16px;
`;

export const CommentsItemUser = styled('h2')`
  ${({ theme }) => theme.typography.h1};
  font-size: 24px;
  color: ${({ theme }) => theme.color.purple};
  margin: 0;
`;

export const CommentsItemContent = styled('div')`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.color.green};
  p {
    margin: 12px 0;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  a {
    color: ${({ theme }) => theme.color.green};
    cursor: pointer;
    white-space: nowrap;
  }
`;

export const CommentsChildItemWrapper = styled('div')<CommentsChildItemWrapperProps>`
  display: ${(props) => (props.$isVisible ? 'block' : 'none')};
`;

export const ExpandWrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ExpandIcon = styled(ArrowIcon)<ExpandIconProps>`
  width: 20px;
  height: 16px;
  fill: ${({ theme }) => theme.color.yellow};
  display: ${(props) => (props.$isVisibleIcon ? 'block' : 'none')};
  cursor: pointer;
  transform: ${(props) => (props.$isExpand ? 'rotate(-180deg)' : 'rotate(0deg)')};
`;
