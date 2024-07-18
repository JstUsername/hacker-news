export interface UseNewsListStateType {
  newsList: NewsListType[] | [];
  getNewsList: () => Promise<void>;
  updateNewsList: (auto: boolean) => Promise<void>;
  isLoading: boolean;
}

export interface NewsListType {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url: string;
  domain: string;
}
