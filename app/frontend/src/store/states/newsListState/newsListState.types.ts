export interface UseNewsListStateType {
  newsList: Promise<NewsListType[]>;
  getNewsList: () => void;
}

export interface NewsListType {
  id: number;
  title: string;
  points: number | null;
  user: string | null;
  time: number;
  timeAgo: string;
  commentsCount: number;
  type: string;
  url?: string;
  domain?: string;
}
