import { create } from 'zustand';
import { UseNewsListStateType, NewsListType } from './newsListState.types';
import { wentWrongError } from '../../../constants';

const newsListUrl = [
  'https://api.hnpwa.com/v0/newest/1.json',
  'https://api.hnpwa.com/v0/newest/2.json',
  'https://api.hnpwa.com/v0/newest/3.json',
  'https://api.hnpwa.com/v0/newest/4.json',
];

const fetchNewsList = async () => {
  let data: NewsListType[] = [];
  const fetchPromises = newsListUrl.map(async (url) => {
    const response = await fetch(`${url}?t=${new Date().getTime()}`);
    if (response.status !== 200) {
      throw new Error(wentWrongError);
    }

    return response.json();
  });
  const promisesResults = await Promise.all(fetchPromises);
  return [data, ...promisesResults].flat();
};

const useNewsListState = create<UseNewsListStateType>((set) => ({
  newsList: new Promise((resolve) => resolve([])),
  getNewsList: () => set({ newsList: fetchNewsList() }),
}));

export const useSelectorNewsList = () => useNewsListState((state) => state.newsList);
export const useSelectorGetNewsList = () => useNewsListState((state) => state.getNewsList);
