import { StyledFooter, StyledLink, ApiLink } from './Footer.styled.ts';
import { useNewsListState } from '../../store/store.ts';

export default function Footer() {
  const { isLoading } = useNewsListState();
  return (
    <StyledFooter $isLoading={isLoading}>
      <StyledLink href="https://github.com/JstUsername">/github</StyledLink>
      <ApiLink href="https://github.com/tastejs/hacker-news-pwas/">/api</ApiLink>
      <StyledLink href="https://t.me/JstUser">/telegram</StyledLink>
    </StyledFooter>
  );
}
