import { StyledFooter, StyledLink, ApiLink } from './Footer.styled.ts';

export default function Footer() {
  return (
    <StyledFooter>
      <StyledLink href="https://github.com/JstUsername">/github</StyledLink>
      <ApiLink href="https://github.com/tastejs/hacker-news-pwas/">/api</ApiLink>
      <StyledLink href="https://t.me/JstUser">/telegram</StyledLink>
    </StyledFooter>
  );
}
