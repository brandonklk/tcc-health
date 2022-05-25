import { valueDotEnvIsBoolean } from '../../../src/utils/EnvUtils';

/**
 * Testes para a função que verifica se o valor do env esta verdadeiro ou falso
 */
test('value dotenv is true', () => {
  const valueIsTrue = valueDotEnvIsBoolean('true');

  expect(valueIsTrue).toBeTruthy();
});

test('value dotenv is false', () => {
  const valueIsTrue = valueDotEnvIsBoolean('false');

  expect(valueIsTrue).toBeFalsy();
});

test('value dotenv is true in uppercase', () => {
  const valueIsTrue = valueDotEnvIsBoolean('TRUE');

  expect(valueIsTrue).toBeTruthy();
});

test('value dotenv is empty', () => {
  const valueIsTrue = valueDotEnvIsBoolean('');

  expect(valueIsTrue).toBeFalsy();
});

test('value dotenv is undefined', () => {
  const valueIsTrue = valueDotEnvIsBoolean(undefined);

  expect(valueIsTrue).toBeFalsy();
});

test('value dotenv is null', () => {
  const valueIsTrue = valueDotEnvIsBoolean(null);

  expect(valueIsTrue).toBeFalsy();
});
