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
import { Link, useParams } from 'react-router-dom';
import { RefreshButton } from '~/commons';
import { ProfileActions } from '~/components/ProfileActions';
import { useSelectorGetNewsItem, useSelectorGetNewsList } from '~/store';

export const Header = ({ resetBoundary }: { resetBoundary?: () => void }) => {
  const { id } = useParams();
  const getNewsItem = useSelectorGetNewsItem();
  const getNewsList = useSelectorGetNewsList();
  const [showProfileActions, setShowProfileActions] = useState(false);

  return (
    <StyledHeader>
      <Link to="/" onClick={resetBoundary}>
        <CroppedHNLogo title="Logo" />
        <HNLogo title="Logo" />
      </Link>
      <HeaderActions>
        <RefreshButton onClick={() => (id === undefined ? getNewsList() : getNewsItem(Number(id)))}>
          {id === undefined ? 'refreshNewsList()' : 'updateCurrentNews()'}
        </RefreshButton>
        <StyledLink href="https://github.com/JstUsername">/github</StyledLink>
        <StyledLink href="https://t.me/JstUser">/telegram</StyledLink>
        <ProfileButton onClick={() => setShowProfileActions((prev) => !prev)}>
          <StyledAvatarIcon />
        </ProfileButton>
      </HeaderActions>
      {showProfileActions && createPortal(<ProfileActions />, document.body)}
    </StyledHeader>
  );
};
