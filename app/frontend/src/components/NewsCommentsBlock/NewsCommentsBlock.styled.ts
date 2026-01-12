import styled from 'styled-components';
import PlusIcon from '~/assets/icons/plus-icon.svg?react';

export const CommentsWrapper = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 24px;
  padding: 24px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.color.backgroundLightTransparent};
  overflow: auto;
  overflow-x: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 16px;
  }
`;

export const NewsTitleContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledPlusIcon = styled(PlusIcon)`
  width: 16px;
  height: 16px;

  path {
    stroke: ${({ theme }) => theme.color.yellow};
  }
`;

export const AddCommentButton = styled('button')`
  all: unset;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;
