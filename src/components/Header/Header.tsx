import { StyledHeader, LinkWrapper, ButtonLink, StyledLink, HNLogo, CroppedHNLogo } from './Header.styled.ts';
import { useSelectorGetNewsItem, useSelectorGetNewsList, useSelectorNewsList } from '../../store/store.ts';
import { useParams, Link } from 'react-router-dom';

export default function Header() {
  const newsList = useSelectorNewsList();
  const getNewsItem = useSelectorGetNewsItem();
  const getNewsList = useSelectorGetNewsList();
  const { id } = useParams();

  return (
    <StyledHeader>
      <Link to="/">
        <CroppedHNLogo title="Logo" />
        <HNLogo title="Logo" />
      </Link>
      <LinkWrapper>
        <ButtonLink onClick={() => (id === undefined ? getNewsList() : getNewsItem(Number(id), newsList, false))}>
          {id === undefined ? 'refreshNewsList()' : 'updateCurrentNews()'}
        </ButtonLink>
        <StyledLink href="https://github.com/JstUsername">/github</StyledLink>
        <StyledLink href="https://t.me/JstUser">/telegram</StyledLink>
        <StyledLink href="https://github.com/tastejs/hacker-news-pwas/">/api</StyledLink>
      </LinkWrapper>
    </StyledHeader>
  );
}
