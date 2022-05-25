import {
  encryptedPwd,
  comparePwd,
  buildKeyUserLoggedInForCache,
} from '../../../src/utils/AuthUtils';

/**
 * Testes para a função de criptografar password
 */
test('lenght password encrypted', async () => {
  const passwordString = '12345678';
  const password = await encryptedPwd(passwordString);

  expect(password.length).toBe(60);
});

test('password is empty', async () => {
  const passwordString = '';
  const password = await encryptedPwd(passwordString);

  const resultPasswordEmpty = '';

  expect(password).toBe(resultPasswordEmpty);
});

test('password is not empty', async () => {
  const passwordString = 'abcde';
  const password = await encryptedPwd(passwordString);

  const resultPasswordEmpty = '';

  expect(password).not.toBe(resultPasswordEmpty);
});

test('password is null', async () => {
  const passwordNull = null;
  const password = await encryptedPwd(passwordNull);

  expect(password).toBeNull();
});

test('password is undefined', async () => {
  const passwordUndefined = undefined;
  const password = await encryptedPwd(passwordUndefined);

  expect(password).toBeUndefined();
});

/**
 * Testes para a função que compara as senhas
 */
test('password is equals', async () => {
  const password = '12345678';
  const passwordEncypted = await encryptedPwd(password);

  const passwordEquals = await comparePwd(password, passwordEncypted);

  expect(passwordEquals).toBeTruthy();
});

test('password is not equals', async () => {
  const password = '12345678';
  const passwordEncypted = await encryptedPwd(password);

  const passwordNotEquals = 'abcdef';

  const passwordEquals = await comparePwd(passwordNotEquals, passwordEncypted);

  expect(passwordEquals).toBeFalsy();
});

test('password user is empty', async () => {
  const password = '12345678';
  const passwordEncypted = await encryptedPwd(password);

  const passwordUser = '';

  const passwordEquals = await comparePwd(passwordUser, passwordEncypted);

  expect(passwordEquals).toBeFalsy();
});

test('password user is null', async () => {
  const password = '12345678';
  const passwordEncypted = await encryptedPwd(password);

  const passwordUserNull = null;

  const passwordEquals = await comparePwd(passwordUserNull, passwordEncypted);

  expect(passwordEquals).toBeFalsy();
});

test('password encrpted user is null', async () => {
  const password = null;
  const passwordUser = '12345678';

  const passwordEquals = await comparePwd(passwordUser, password);

  expect(passwordEquals).toBeFalsy();
});

test('password encrpted user is empty', async () => {
  const passwordEmpty = '';
  const passwordUser = '12345678';

  const passwordEquals = await comparePwd(passwordUser, passwordEmpty);

  expect(passwordEquals).toBeFalsy();
});

test('password encrpted user is undefined', async () => {
  const passwordUndefined = undefined;
  const passwordUser = '12345678';

  const passwordEquals = await comparePwd(passwordUser, passwordUndefined);

  expect(passwordEquals).toBeFalsy();
});

/**
 * Testes para a função que cria a key do usuário para o cache
 */
test('key user cache success', () => {
  const userId = 1;
  const keyCache = 'minha_key_cache';

  const keyUser = buildKeyUserLoggedInForCache(userId, keyCache);

  expect(keyUser).toBe(`${keyCache}-${userId}`);
});

test('key user cache is null', () => {
  const userId = 1;
  const keyCache = null;

  const resultBuildKeyUserCache = '';

  const keyUser = buildKeyUserLoggedInForCache(userId, keyCache);

  expect(keyUser).toBe(resultBuildKeyUserCache);
});

test('key user cache is undefined', () => {
  const userId = 1;
  const keyCache = undefined;

  const resultBuildKeyUserCache = '';

  const keyUser = buildKeyUserLoggedInForCache(userId, keyCache);

  expect(keyUser).toBe(resultBuildKeyUserCache);
});

test('key user cache is empty', () => {
  const userId = 1;
  const keyCache = '';

  const resultBuildKeyUserCache = '';

  const keyUser = buildKeyUserLoggedInForCache(userId, keyCache);

  expect(keyUser).toBe(resultBuildKeyUserCache);
});

test('userId from cache is null', () => {
  const userId = null;
  const keyCache = 'minha_key_cache';

  const resultBuildKeyUserCache = '';

  const keyUser = buildKeyUserLoggedInForCache(userId, keyCache);

  expect(keyUser).toBe(resultBuildKeyUserCache);
});

test('userId from cache is zero', () => {
  const userId = 0;
  const keyCache = 'minha_key_cache';

  const resultBuildKeyUserCache = '';

  const keyUser = buildKeyUserLoggedInForCache(userId, keyCache);

  expect(keyUser).toBe(resultBuildKeyUserCache);
});

test('userId from cache is undefined', () => {
  const userId = undefined;
  const keyCache = 'minha_key_cache';

  const resultBuildKeyUserCache = '';

  const keyUser = buildKeyUserLoggedInForCache(userId, keyCache);

  expect(keyUser).toBe(resultBuildKeyUserCache);
});
