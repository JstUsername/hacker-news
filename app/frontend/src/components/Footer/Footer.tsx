import { StyledFooter } from './Footer.styled';
import { StyledLink, Text } from '~/commons';

export const Footer = () => {
  return (
    <StyledFooter>
      <StyledLink to="https://github.com/JstUsername">
        <Text $variant="body2">/github</Text>
      </StyledLink>
      <StyledLink to="https://t.me/JstUser">
        <Text $variant="body2">/telegram</Text>
      </StyledLink>
    </StyledFooter>
  );
};
