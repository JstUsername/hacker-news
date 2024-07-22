import { StyledHeader, LinkWrapper, ButtonLink, StyledLink, HNLogo, CroppedHNLogo } from './Header.styled.ts';
import { useSelectorGetNewsItem, useSelectorNewsList, useSelectorUpdateNewsList } from '../../store/store.ts';
import { useNavigate, useParams } from 'react-router-dom';

export default function Header() {
  const newsList = useSelectorNewsList();
  const getNewsItem = useSelectorGetNewsItem();
  const updateNewsList = useSelectorUpdateNewsList();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <StyledHeader>
      <CroppedHNLogo title="Logo" onClick={() => navigate('/')} />
      <HNLogo title="Logo" onClick={() => navigate('/')} />
      <LinkWrapper>
        <ButtonLink
          onClick={() => (id === undefined ? updateNewsList(false) : getNewsItem(Number(id), newsList, false))}
        >
          {id === undefined ? 'refreshNewsList()' : 'updateCurrentNews()'}
        </ButtonLink>
        <StyledLink href="https://github.com/JstUsername">/github</StyledLink>
        <StyledLink href="https://t.me/JstUser">/telegram</StyledLink>
        <StyledLink href="https://github.com/tastejs/hacker-news-pwas/">/api</StyledLink>
      </LinkWrapper>
    </StyledHeader>
  );
}
