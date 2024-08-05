import { fromUnixTime, lightFormat } from 'date-fns';

export const timestampToDate = (timestamp: number) => {
  const date = fromUnixTime(timestamp);
  return lightFormat(date, 'HH:mm dd.MM.yy').toString();
};
