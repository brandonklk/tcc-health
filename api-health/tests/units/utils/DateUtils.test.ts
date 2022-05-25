import { buildDateCurrent } from '../../../src/utils/DateUtils';

/**
 * Testes para a função que gera a data atual para o banco
 */
test('date is current', () => {
  const dateCurrent = new Date();
  const date = buildDateCurrent();

  expect(date).toEqual(dateCurrent);
});

test('date is not next day', () => {
  const dateCurrent = new Date();
  const nextDay = new Date();
  nextDay.setDate(dateCurrent.getDate() + 1);

  const date = buildDateCurrent();

  expect(date).not.toEqual(nextDay);
});

test('date is not last day', () => {
  const dateCurrent = new Date();
  const nextDay = new Date();
  nextDay.setDate(dateCurrent.getDate() - 1);

  const date = buildDateCurrent();

  expect(date).not.toEqual(nextDay);
});
