import styled from 'styled-components';

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

export const CommentsLoaderWrapper = styled('div')`
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
