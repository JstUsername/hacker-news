import { useAuthState } from '~/store/states/authState';

const refreshState = {
  isRefreshing: false,
  promise: null as Promise<void> | null,
};

const getAccessToken = () => useAuthState.getState().accessToken;
const getRefresh = () => useAuthState.getState().refresh;

export const fetchWithAuth = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const accessToken = getAccessToken();
  const headers = new Headers(init?.headers);

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const initialResponse = await fetch(input, {
    ...init,
    headers,
    credentials: 'include',
  });

  if (initialResponse.status === 401 && accessToken) {
    if (!refreshState.isRefreshing) {
      refreshState.isRefreshing = true;

      refreshState.promise = getRefresh()()
        .catch(() => {
          useAuthState.setState({ accessToken: null });
        })
        .finally(() => {
          refreshState.isRefreshing = false;
          refreshState.promise = null;
        });
    }

    if (refreshState.promise) await refreshState.promise;
    const newAccessToken = getAccessToken();

    if (newAccessToken) {
      headers.set('Authorization', `Bearer ${newAccessToken}`);

      return fetch(input, {
        ...init,
        headers,
        credentials: 'include',
      });
    }
  }

  return initialResponse;
};
