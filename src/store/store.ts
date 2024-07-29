import { create } from 'zustand';
import { NewsItemType, NewsListType, UseNewsItemType, UseNewsListStateType } from './store.types.ts';

const newsListUrl = [
  'https://api.hnpwa.com/v0/newest/1.json',
  'https://api.hnpwa.com/v0/newest/2.json',
  'https://api.hnpwa.com/v0/newest/3.json',
  'https://api.hnpwa.com/v0/newest/4.json',
];

const useNewsListState = create<UseNewsListStateType>((set) => ({
  newsList: [],
  newsLoading: false,
  newsServerDown: false,
  getNewsList: async () => {
    let data: NewsListType[] | [] = [];
    const fetchPromises = newsListUrl.map(async (url) => {
      const response = await fetch(`${url}?t=${new Date().getTime()}`);
      if (response.status === 500) {
        set({ newsServerDown: true });
        return;
      }
      return response.json();
    });
    const promisesResults = await Promise.all(fetchPromises);
    data = data.concat(...promisesResults);
    set({ newsList: data });
  },
}));

export const useSelectorNewsList = () => useNewsListState((state) => state.newsList);
export const useSelectorNewsServerDown = () => useNewsListState((state) => state.newsServerDown);
export const useSelectorGetNewsList = () => useNewsListState((state) => state.getNewsList);

const useNewsItemState = create<UseNewsItemType>((set) => ({
  newsItem: null,
  itemLoading: false,
  commentsLoading: false,
  itemServerDown: false,
  getNewsContent: (id, newsList) => {
    let foundNews = newsList.find((news) => news.id === id);
    if (foundNews !== undefined) {
      const transformedFoundNews: NewsItemType = { ...foundNews, content: '', comments: [], level: 0 };
      set({ newsItem: transformedFoundNews });
    }
  },
  getNewsItem: async (id, newsList, auto) => {
    if (newsList.length === 0) {
      !auto ? set({ itemLoading: true }) : null;
    }
    !auto ? set({ commentsLoading: true }) : null;
    let data: NewsItemType | null = null;
    const response = await fetch(`https://api.hnpwa.com/v0/item/${id}.json`);
    if (response.status === 500) {
      set({ itemLoading: false, itemServerDown: true });
      return;
    }
    data = await response.json();
    const addVisibleField = (commentsList: NewsItemType) => {
      switch (commentsList.level) {
        case undefined:
          break;
        case 0:
          commentsList.visible = true;
          break;
        default:
          commentsList.visible = false;
      }
      commentsList.comments.forEach(addVisibleField);
    };
    data !== null ? addVisibleField(data) : null;
    const clearingDeleted = (commentsList: NewsItemType) => {
      if (commentsList.deleted === true && commentsList.comments.length !== 0) {
        commentsList.content = '';
        commentsList.comments = [];
      }
      commentsList.comments.forEach(clearingDeleted);
    };
    data !== null ? clearingDeleted(data) : null;
    const addExpandField = (commentsList: NewsItemType) => {
      if (commentsList.comments.length !== 0) {
        commentsList.expand = false;
      }
      commentsList.comments.forEach(addExpandField);
    };
    data !== null ? addExpandField(data) : null;
    set({ newsItem: data });
    !auto ? set({ itemLoading: false, commentsLoading: false }) : null;
  },
  setExpandVisible: (id, newsItem) => {
    if (newsItem === null) return;
    const newData = { ...newsItem };
    const toggleExpandVisible = (obj: NewsItemType) => {
      if (obj.id === id) {
        obj.expand = !obj.expand;
        obj.comments.map((childComments) => {
          childComments.visible = !childComments.visible;
        });
        set({ newsItem: { ...newData } });
      }
      if (obj.comments && obj.comments.length > 0) {
        obj.comments.forEach(toggleExpandVisible);
      }
    };
    toggleExpandVisible(newData);
  },
}));

export const useSelectorNewsItem = () => useNewsItemState((state) => state.newsItem);
export const useSelectorItemLoading = () => useNewsItemState((state) => state.itemLoading);
export const useSelectorCommentsLoading = () => useNewsItemState((state) => state.commentsLoading);
export const useSelectorItemServerDown = () => useNewsItemState((state) => state.itemServerDown);
export const useSelectorGetNewsContent = () => useNewsItemState((state) => state.getNewsContent);
export const useSelectorGetNewsItem = () => useNewsItemState((state) => state.getNewsItem);
export const useSelectorSetExpandVisible = () => useNewsItemState((state) => state.setExpandVisible);
