import { NewsItemType, UseNewsItemType } from './newsItemState.types';
import { create } from 'zustand';
import { NOT_FOUND_ERROR, WENT_WRONG_ERROR } from '~/constants';
import { createEmptyPromise } from '~/utils';

const fetchNewsItem = async (id: number) => {
  let data: NewsItemType | null = null;
  const response = await fetch(`/api/items/${id}`);
  if (response.status === 404) throw new Error(NOT_FOUND_ERROR);
  if (response.status !== 200) throw new Error(WENT_WRONG_ERROR);
  data = await response.json();
  return data;
};

const useNewsItemState = create<UseNewsItemType>((set) => ({
  newsItem: createEmptyPromise(null),

  getNewsItem: (id) => {
    const newsItemPromise = fetchNewsItem(id);
    set({ newsItem: newsItemPromise });
  },

  resetNewsItem: () => set({ newsItem: createEmptyPromise(null) }),
}));

export const useSelectorNewsItem = () => useNewsItemState((state) => state.newsItem);
export const useSelectorGetNewsItem = () => useNewsItemState((state) => state.getNewsItem);
export const useSelectorResetNewsItem = () => useNewsItemState((state) => state.resetNewsItem);
