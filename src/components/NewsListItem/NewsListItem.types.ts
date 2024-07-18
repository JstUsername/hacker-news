export interface NewsListItemProps {
  id: number;
  title: string;
  points?: number | null;
  user?: string | null;
  time_ago: string;
}
