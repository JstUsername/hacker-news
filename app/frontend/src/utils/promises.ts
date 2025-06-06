export const createEmptyPromise = <T>(value: T): Promise<T> => Promise.resolve(value);
