import { formatDistanceToNow, fromUnixTime } from 'date-fns';

export const timestampToAgo = (timestamp: number) => {
  const date = fromUnixTime(timestamp);
  return formatDistanceToNow(date, { addSuffix: true }).toString();
};
