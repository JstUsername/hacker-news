import styled from 'styled-components';
import { TextProps } from './Text.types';

export const Text = styled('span')<TextProps>`
  ${({ theme, $variant }) => theme.typography[$variant]};
  color: ${({ theme, color }) => theme.color[color]};
`;
