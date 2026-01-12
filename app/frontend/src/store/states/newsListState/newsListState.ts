import { UseNewsListStateType } from './newsListState.types';
import { create } from 'zustand';
import { NOT_FOUND_ERROR, WENT_WRONG_ERROR } from '~/constants';
import { createEmptyPromise } from '~/utils';

const newsListUrl = ['/api/newest'];

const fetchNewsList = async () => {
  const fetchPromises = newsListUrl.map(async (url) => {
    const response = await fetch(`${url}?t=${new Date().getTime()}`);
    if (response.status === 404) throw new Error(NOT_FOUND_ERROR);
    if (response.status !== 200) throw new Error(WENT_WRONG_ERROR);
    return response.json();
  });

  const promisesResults = await Promise.all(fetchPromises);
  return promisesResults.flat();
};

const useNewsListState = create<UseNewsListStateType>((set) => ({
  newsList: createEmptyPromise([]),

  getNewsList: () => {
    const newsListPromise = fetchNewsList();
    set({ newsList: newsListPromise });
  },
}));

export const useSelectorNewsList = () => useNewsListState((state) => state.newsList);
export const useSelectorGetNewsList = () => useNewsListState((state) => state.getNewsList);
