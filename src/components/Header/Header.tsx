import { StyledHeader, LinkWrapper, StyledLink, HNLogo, CroppedHNLogo } from './Header.styled.ts';
import { RefreshButton } from '../../commons/RefreshButton/RefreshButton.ts';
import { useSelectorGetNewsList, useSelectorNewsList } from '../../store/states/newsListState/newsListState.ts';
import { useSelectorGetNewsItem } from '../../store/states/newsItemState/newsItemState.ts';
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
        <RefreshButton onClick={() => (id === undefined ? getNewsList() : getNewsItem(Number(id), newsList, false))}>
          {id === undefined ? 'refreshNewsList()' : 'updateCurrentNews()'}
        </RefreshButton>
        <StyledLink href="https://github.com/JstUsername">/github</StyledLink>
        <StyledLink href="https://t.me/JstUser">/telegram</StyledLink>
        <StyledLink href="https://github.com/tastejs/hacker-news-pwas/">/api</StyledLink>
      </LinkWrapper>
    </StyledHeader>
  );
}
