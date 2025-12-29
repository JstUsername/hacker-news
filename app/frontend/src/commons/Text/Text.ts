import { TextProps } from './Text.types';
import styled from 'styled-components';

export const Text = styled('span')<TextProps>`
  ${({ theme, $variant }) => theme.typography[$variant || 'body1']};
  color: ${({ theme, color }) => theme.color[color || 'green']};
`;
