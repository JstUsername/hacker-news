import { formatDistanceToNow, fromUnixTime, lightFormat } from 'date-fns';

export const timestampToDate = (timestamp: number) => {
  const date = fromUnixTime(timestamp);
  return lightFormat(date, 'HH:mm dd.MM.yy').toString();
};

export const timestampToAgo = (timestamp: number) => {
  const date = fromUnixTime(timestamp);
  return formatDistanceToNow(date, { addSuffix: true }).toString();
};
