import styled from 'styled-components';

export const Text = styled('span')<{ $variant: string; color: string }>`
  ${({ theme, $variant }) => theme.typography[$variant]};
  color: ${({ theme, color }) => theme.color[color]};
`;
