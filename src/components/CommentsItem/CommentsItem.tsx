import { CommentsListProps } from './CommentsItem.types.ts';
import { useSelectorNewsItem, useSelectorSetExpandVisible } from '../../store/states/newsItemState/newsItemState.ts';
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
  const newsItem = useSelectorNewsItem();
  const setExpandVisible = useSelectorSetExpandVisible();

  const handleClickExpand = (id: number) => {
    setExpandVisible(id, newsItem);
  };

  return (
    <CommentsItemWrapper>
      <div>
        <ExpandWrapper>
          <ExpandIcon
            $isVisibleIcon={comment.comments.length !== 0}
            $isExpand={comment.expand}
            onClick={() => {
              handleClickExpand(comment.id);
            }}
          />
          <CommentsItemUser>{comment.user}</CommentsItemUser>
        </ExpandWrapper>
        <CommentsItemContent dangerouslySetInnerHTML={{ __html: comment.content }} />
      </div>
      {comment.comments.length > 0 &&
        comment.comments.map((childComment: NewsItemType) => (
          <CommentsChildItemWrapper key={childComment.id} $isVisible={childComment.visible}>
            <CommentsItem comment={childComment} />
          </CommentsChildItemWrapper>
        ))}
    </CommentsItemWrapper>
  );
}
