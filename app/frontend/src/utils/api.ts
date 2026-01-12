import { WENT_WRONG_ERROR } from '~/constants';
import { useAuthState } from '~/store/states/authState/authState';

export interface AuthenticatedApiRequestOptions extends RequestInit {
  skipAuthRefresh?: boolean;
}

export interface ErrorResponse {
  status: number;
  message: string;
  timestamp: string;
}

export const createEmptyPromise = <T>(value: T): Promise<T> => Promise.resolve(value);

const refreshState = {
  promise: null as Promise<boolean> | null,
  isRefreshing: false,
};

export const parseErrorResponse = async (response: Response): Promise<string> => {
  try {
    const errorData: ErrorResponse = await response.json();
    return errorData.message || WENT_WRONG_ERROR;
  } catch {
    return WENT_WRONG_ERROR;
  }
};

const attemptRefresh = async (): Promise<boolean> => {
  if (refreshState.isRefreshing && refreshState.promise) {
    return await refreshState.promise;
  }

  refreshState.isRefreshing = true;

  refreshState.promise = (async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.status !== 200) {
        const errorMessage = await parseErrorResponse(response);
        throw new Error(errorMessage);
      }

      await response.json();
      await useAuthState.getState().refresh();
      return true;
    } catch {
      return false;
    } finally {
      refreshState.isRefreshing = false;
      refreshState.promise = null;
    }
  })();

  return await refreshState.promise;
};

const makeRequest = (url: string, options: RequestInit): Promise<Response> => {
  return fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  if (response.status === 204) return undefined as T;
  return response.json();
};

export const authenticatedApiRequest = async <T = unknown>(
  url: string,
  options: AuthenticatedApiRequestOptions = {},
): Promise<T> => {
  const { skipAuthRefresh = false, ...fetchOptions } = options;

  const executeRequest = async (): Promise<Response> => {
    return makeRequest(url, fetchOptions);
  };

  const response = await executeRequest();

  if (response.status === 401 && !skipAuthRefresh) {
    const refreshSuccess = await attemptRefresh();

    if (!refreshSuccess) {
      const errorMessage = await parseErrorResponse(response);
      throw new Error(errorMessage);
    }

    const retryResponse = await executeRequest();
    return handleResponse<T>(retryResponse);
  }

  return handleResponse<T>(response);
};
