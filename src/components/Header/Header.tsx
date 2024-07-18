import { StyledHeader, LinkWrapper, ButtonLink, StyledLink, HNLogo, CroppedHNLogo } from './Header.styled.ts';
import { useNewsListState } from '../../store/store.ts';

export default function Header() {
  const { updateNewsList } = useNewsListState();
  return (
    <StyledHeader>
      <CroppedHNLogo title="Logo" />
      <HNLogo title="Logo" />
      <LinkWrapper>
        <ButtonLink onClick={() => updateNewsList(false)}>refreshNewsList()</ButtonLink>
        <StyledLink href="https://github.com/JstUsername">/github</StyledLink>
        <StyledLink href="https://t.me/JstUser">/telegram</StyledLink>
        <StyledLink href="https://github.com/tastejs/hacker-news-pwas/">/api</StyledLink>
      </LinkWrapper>
    </StyledHeader>
  );
}
