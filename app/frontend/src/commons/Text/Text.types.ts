import { theme } from '~/theme';

export interface TextProps {
  $variant?: 'h1' | 'body1' | 'body2';
  color?: keyof typeof theme.color;
}
