import { ProfileActionsList, ProfileActionsListItem, ProfileActionsWrapper } from './ProfileActions.styled';
import { ProfileActionsProps } from './ProfileActions.types';
import { Link } from 'react-router-dom';
import { Text } from '~/commons';

export const ProfileActions = ({ isAuthorized }: ProfileActionsProps) => {
  return (
    <ProfileActionsWrapper>
      <ProfileActionsList>
        {isAuthorized ? (
          <ProfileActionsListItem>
            <Text>Sign out</Text>
          </ProfileActionsListItem>
        ) : (
          <>
            <ProfileActionsListItem>
              <Link to="/signin">
                <Text>Sign in</Text>
              </Link>
            </ProfileActionsListItem>
            <ProfileActionsListItem>
              <Link to="/signup">
                <Text>Sing up</Text>
              </Link>
            </ProfileActionsListItem>
          </>
        )}
      </ProfileActionsList>
    </ProfileActionsWrapper>
  );
};
