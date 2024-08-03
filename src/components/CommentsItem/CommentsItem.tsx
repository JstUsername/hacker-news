import { useState } from 'react';
import { CommentsListProps } from './CommentsItem.types.ts';
import {
  CommentsItemWrapper,
  CommentsItemContent,
  CommentsItemUser,
  CommentsChildItemWrapper,
  ExpandWrapper,
  ExpandIcon,
} from './CommentsItem.styled.ts';
import { NewsItemType } from '../../store/states/newsItemState/newsItemState.types.ts';

export default function CommentsItem({ comment }: CommentsListProps) {
  const [isExpandVisible, setIsExpandVisible] = useState(false);

  return (
    <CommentsItemWrapper>
      <div>
        <ExpandWrapper>
          <ExpandIcon
            $isVisibleIcon={comment.comments.length !== 0}
            $isExpand={isExpandVisible}
            onClick={() => {
              setIsExpandVisible(!isExpandVisible);
            }}
          />
          <CommentsItemUser>{comment.user}</CommentsItemUser>
        </ExpandWrapper>
        <CommentsItemContent dangerouslySetInnerHTML={{ __html: comment.content }} />
      </div>
      {comment.comments?.map((childComment: NewsItemType) => {
        if (childComment.deleted || childComment.dead) {
          return null;
        }
        return (
          <CommentsChildItemWrapper key={childComment.id} $isVisible={isExpandVisible}>
            <CommentsItem comment={childComment} />
          </CommentsChildItemWrapper>
        );
      })}
    </CommentsItemWrapper>
  );
}
