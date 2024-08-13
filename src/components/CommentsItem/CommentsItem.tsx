import { useState } from 'react';
import { CommentsListProps } from './CommentsItem.types';
import {
  CommentsItemWrapper,
  CommentsItemContent,
  CommentsItemUser,
  ExpandWrapper,
  ExpandIcon,
} from './CommentsItem.styled';
import { NewsItemType } from '../../store/states/newsItemState/newsItemState.types';

export default function CommentsItem({ comment }: CommentsListProps) {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <CommentsItemWrapper>
      <div>
        <ExpandWrapper>
          <ExpandIcon
            $isVisibleIcon={comment.comments.length !== 0}
            $isExpand={isExpand}
            onClick={() => {
              setIsExpand(!isExpand);
            }}
          />
          <CommentsItemUser>{comment.user}</CommentsItemUser>
        </ExpandWrapper>
        <CommentsItemContent dangerouslySetInnerHTML={{ __html: comment.content }} />
      </div>
      {isExpand &&
        comment.comments?.map((childComment: NewsItemType) => {
          if (childComment.deleted || childComment.dead) {
            return null;
          }

          return <CommentsItem key={childComment.id} comment={childComment} />;
        })}
    </CommentsItemWrapper>
  );
}
