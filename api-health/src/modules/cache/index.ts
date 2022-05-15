import NodeCache, { Key } from 'node-cache';

const cacheApp = new NodeCache({ stdTTL: 0, checkperiod: 0 });

export const saveCache = (key: Key, value: any) => {
  cacheApp.set(key, value)
}

export const getCache = (key: Key) => {
  return cacheApp.get(key)
}

export const deleteCache = (key: Key) => {
  cacheApp.del(key)
}

export const hasCache = (key: Key) => {
  return cacheApp.has(key)
}
