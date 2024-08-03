import { StyledHeader, LinkWrapper, StyledLink, HNLogo, CroppedHNLogo } from './Header.styled';
import { RefreshButton } from '../../commons/RefreshButton/RefreshButton';
import { useSelectorGetNewsList } from '../../store/states/newsListState/newsListState';
import { useSelectorGetNewsItem } from '../../store/states/newsItemState/newsItemState';
import { useParams, Link } from 'react-router-dom';

export default function Header() {
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
        <RefreshButton onClick={() => (id === undefined ? getNewsList() : getNewsItem(Number(id)))}>
          {id === undefined ? 'refreshNewsList()' : 'updateCurrentNews()'}
        </RefreshButton>
        <StyledLink href="https://github.com/JstUsername">/github</StyledLink>
        <StyledLink href="https://t.me/JstUser">/telegram</StyledLink>
        <StyledLink href="https://github.com/tastejs/hacker-news-pwas/">/api</StyledLink>
      </LinkWrapper>
    </StyledHeader>
  );
}
