import { authenticatedApiRequest, parseErrorResponse } from './api';
import { NOT_FOUND_ERROR, WENT_WRONG_ERROR } from '~/constants';
import { AuthResponse, MeResponse, NewsItemType } from '~/types';

const newsListUrl = ['/api/newest'];

export const fetchNewsList = async () => {
  const fetchPromises = newsListUrl.map(async (url) => {
    const response = await fetch(`${url}?t=${new Date().getTime()}`);
    if (response.status === 404) throw new Error(NOT_FOUND_ERROR);
    if (response.status !== 200) throw new Error(WENT_WRONG_ERROR);
    return response.json();
  });

  const promisesResults = await Promise.all(fetchPromises);
  return promisesResults.flat();
};

export const fetchNewsItem = async (id: number) => {
  let data: NewsItemType | null = null;
  const response = await fetch(`/api/items/${id}`);
  if (response.status === 404) throw new Error(NOT_FOUND_ERROR);
  if (response.status !== 200) throw new Error(WENT_WRONG_ERROR);
  data = await response.json();
  return data;
};

export const fetchAddComment = async (parentId: number, content: string): Promise<NewsItemType> => {
  return await authenticatedApiRequest(`/api/items/${parentId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
};

export const fetchRemoveComment = async (commentId: number): Promise<void> => {
  await authenticatedApiRequest(`/api/items/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const fetchMe = async (): Promise<MeResponse> => {
  const response = await fetch('/api/me', {
    method: 'GET',
    credentials: 'include',
  });

  if (response.status !== 200) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return response.json();
};

export const fetchLogin = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });

  if (response.status !== 200) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return response.json();
};

export const fetchRegister = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });

  if (response.status !== 200) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return response.json();
};

export const fetchLogout = async (): Promise<void> => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (response.status !== 204) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }
};

export const fetchRefresh = async (): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  });

  if (response.status !== 200) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return response.json();
};
