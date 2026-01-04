import { ProfileActionsList, ProfileActionsListItem, ProfileActionsWrapper } from './ProfileActions.styled';
import { ProfileActionsProps } from './ProfileActions.types';
import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '~/commons';
import { useSelectorIsAuthenticated, useSelectorLogout } from '~/store';

export const ProfileActions = ({ onClose }: ProfileActionsProps) => {
  const isAuthenticated = useSelectorIsAuthenticated();
  const logout = useSelectorLogout();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!wrapperRef.current || wrapperRef.current.contains(event.target as Node)) return;
      onClose?.();
    },
    [onClose],
  );

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  }, [logout]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <ProfileActionsWrapper ref={wrapperRef}>
      <ProfileActionsList>
        {isAuthenticated ? (
          <ProfileActionsListItem onClick={handleLogout}>
            <Text $variant="body2">Sign out</Text>
          </ProfileActionsListItem>
        ) : (
          <>
            <ProfileActionsListItem>
              <Link to="/signin" onClick={onClose}>
                <Text $variant="body2">Sign in</Text>
              </Link>
            </ProfileActionsListItem>
            <ProfileActionsListItem>
              <Link to="/signup" onClick={onClose}>
                <Text $variant="body2">Sing up</Text>
              </Link>
            </ProfileActionsListItem>
          </>
        )}
      </ProfileActionsList>
    </ProfileActionsWrapper>
  );
};
