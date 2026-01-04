import styled from 'styled-components';

export const ProfileActionsWrapper = styled('div')`
  position: absolute;
  top: 68px;
  right: 24px;
  padding: 6px 16px;
  background: ${({ theme }) => theme.color.backgroundDark};
`;

export const ProfileActionsList = styled('ul')`
  all: unset;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProfileActionsListItem = styled('li')`
  all: unset;
  cursor: pointer;

  a {
    text-decoration: none;
  }
`;
