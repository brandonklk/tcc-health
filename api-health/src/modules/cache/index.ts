import NodeCache, { Key } from 'node-cache';

const cacheApp = new NodeCache({ stdTTL: 0, checkperiod: 0 });

export const saveCache = <T>(key: Key, value: T, expireTime: number = 0) => {
  cacheApp.set(key, value, expireTime);
};

export const getCache = <T>(key: Key) => {
  return cacheApp.get<T>(key);
};

export const deleteCache = (key: Key) => {
  cacheApp.del(key);
};

export const hasCache = (key: Key) => {
  return cacheApp.has(key);
};
