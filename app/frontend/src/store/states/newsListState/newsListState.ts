import { wentWrongError } from '../../../constants';
import { UseNewsListStateType } from './newsListState.types';
import { create } from 'zustand';

const EXPRESS_HOST = import.meta.env.VITE_EXPRESS_HOST || 'localhost';
const EXPRESS_PORT = parseInt(import.meta.env.VITE_EXPRESS_PORT || '3001');

const newsListUrl = [`http://${EXPRESS_HOST}:${EXPRESS_PORT}/api/newest`];

const fetchNewsList = async () => {
  const fetchPromises = newsListUrl.map(async (url) => {
    const response = await fetch(`${url}?t=${new Date().getTime()}`);
    if (response.status !== 200) {
      throw new Error(wentWrongError);
    }

    return response.json();
  });
  const promisesResults = await Promise.all(fetchPromises);
  return promisesResults.flat();
};

const useNewsListState = create<UseNewsListStateType>((set) => ({
  newsList: new Promise((resolve) => resolve([])),
  getNewsList: () => set({ newsList: fetchNewsList() }),
}));

export const useSelectorNewsList = () => useNewsListState((state) => state.newsList);
export const useSelectorGetNewsList = () => useNewsListState((state) => state.getNewsList);
