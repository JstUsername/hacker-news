import { ItemsModel } from './items.model';

export interface GenerateNews {
  timestamp: number;
  commentsCount: number;
  url: string;
}

export interface GenerateComment {
  commentTime: number;
  commentRepliesCount: number;
  parentId: number;
}

export interface GenerateReplies {
  parentComment: ItemsModel;
  commentRepliesCount: number;
  level: number;
  maxLevel: number;
  baseTime: number;
  maxCommentsReplies: number;
}
