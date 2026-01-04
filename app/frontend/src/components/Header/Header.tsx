import {
  CroppedHNLogo,
  HeaderActions,
  HNLogo,
  ProfileButton,
  StyledAvatarIcon,
  StyledHeader,
  StyledLink,
} from './Header.styled';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useParams } from 'react-router-dom';
import { RefreshButton, Text } from '~/commons';
import { ProfileActions } from '~/components/ProfileActions';
import { useSelectorGetNewsItem, useSelectorGetNewsList } from '~/store';

export const Header = ({ resetBoundary }: { resetBoundary?: () => void }) => {
  const { id } = useParams();
  const location = useLocation();
  const getNewsItem = useSelectorGetNewsItem();
  const getNewsList = useSelectorGetNewsList();
  const [showProfileActions, setShowProfileActions] = useState(false);

  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <StyledHeader>
      <Link to="/" onClick={resetBoundary}>
        <CroppedHNLogo title="Logo" />
        <HNLogo title="Logo" />
      </Link>
      <HeaderActions>
        {!isAuthPage && (
          <RefreshButton onClick={() => (id === undefined ? getNewsList() : getNewsItem(Number(id)))}>
            {id === undefined ? 'refreshNewsList()' : 'updateCurrentNews()'}
          </RefreshButton>
        )}
        <StyledLink href="https://github.com/JstUsername">
          <Text $variant="body2">/github</Text>
        </StyledLink>
        <StyledLink href="https://t.me/JstUser">
          <Text $variant="body2">/telegram</Text>
        </StyledLink>
        <ProfileButton onClick={() => setShowProfileActions((prev) => !prev)}>
          <StyledAvatarIcon />
        </ProfileButton>
      </HeaderActions>
      {showProfileActions &&
        createPortal(<ProfileActions onClose={() => setShowProfileActions(false)} />, document.body)}
    </StyledHeader>
  );
};
