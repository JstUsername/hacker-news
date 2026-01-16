import { UseNewsListStateType } from './newsListState.types';
import { create } from 'zustand';
import { fetchNewsList } from '~/utils';

const useNewsListState = create<UseNewsListStateType>((set) => ({
  newsList: Promise.resolve([]),

  getNewsList: () => {
    const newsListPromise = fetchNewsList();
    set({ newsList: newsListPromise });
  },
}));

export const useSelectorNewsList = () => useNewsListState((state) => state.newsList);
export const useSelectorGetNewsList = () => useNewsListState((state) => state.getNewsList);
