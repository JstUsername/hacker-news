export interface UseNewsItemType {
  newsItem: Promise<NewsItemType | null>;
  getNewsItem: (id: number) => void;
}

export interface NewsItemType {
  id: number;
  title: string;
  points: number | null;
  user: string | null;
  time: number;
  time_ago: string;
  content: string;
  deleted?: boolean;
  dead?: boolean;
  type: string;
  url?: string;
  domain?: string;
  comments: NewsItemType[];
  level: number;
  comments_count: number;
  visible?: boolean;
  expand?: boolean;
}
