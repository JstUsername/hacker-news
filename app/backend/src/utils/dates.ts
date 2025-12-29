import { formatDistanceToNow, fromUnixTime } from 'date-fns';
import ms from 'ms';

export const timestampToAgo = (timestamp: number) => {
  const date = fromUnixTime(timestamp);
  return formatDistanceToNow(date, { addSuffix: true }).toString();
};

export const msToMilliseconds = (value: ms.StringValue) => ms(value);
