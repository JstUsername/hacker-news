import { NewsItemType } from '../../store/store.types.ts';

export interface CommentsListProps {
  comment: NewsItemType;
}

export interface CommentsChildItemWrapperProps {
  $isVisible: boolean | undefined;
}

export interface ExpandIconProps {
  $isVisibleIcon: boolean;
  $isExpand: boolean | undefined;
}
