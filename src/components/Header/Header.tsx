import { StyledHeader, LinkWrapper, Link, ButtonLink, HNLogo, CroppedHNLogo } from './Header.styled.ts';
import { useNewsListState } from '../../store/store.ts';

export default function Header() {
  const { updateNewsList } = useNewsListState();
  return (
    <StyledHeader>
      <CroppedHNLogo title="Logo" />
      <HNLogo title="Logo" />
      <LinkWrapper>
        <ButtonLink onClick={updateNewsList}>refreshNewsList()</ButtonLink>
        <Link href="https://github.com/JstUsername">/github</Link>
        <Link href="https://t.me/JstUser">/telegram</Link>
        <Link href="https://github.com/tastejs/hacker-news-pwas/">/api</Link>
      </LinkWrapper>
    </StyledHeader>
  );
}
