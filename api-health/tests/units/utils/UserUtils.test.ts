import { emailUserExist } from '../../../src/utils/UserUtils';
import { IUsers } from '../../../src/interfaces';

const createUsers = () => {
  const users: IUsers[] = [];

  for (let i = 0; i <= 3; i++) {
    users.push({
      user_id: i,
      email: `usuario${i}@teste.com`,
    });
  }

  return users;
};

/**
 * Testes para a função que verifica se o email do usuário já existe
 */
test('mail user not exist', () => {
  const mailUser = 'usuario5@teste.com';
  const users = createUsers();

  const emailExist = emailUserExist(users, mailUser);

  expect(emailExist).toBeFalsy();
});

test('mail user exist', () => {
  const mailUser = 'usuario0@teste.com';
  const users = createUsers();

  const emailExist = emailUserExist(users, mailUser);

  expect(emailExist).toBeTruthy();
});

test('mail user is empty', () => {
  const mailUser = '';
  const users = createUsers();

  const emailExist = emailUserExist(users, mailUser);

  expect(emailExist).toBeFalsy();
});

test('mail user is null', () => {
  const mailUser = null;
  const users = createUsers();

  const emailExist = emailUserExist(users, mailUser);

  expect(emailExist).toBeFalsy();
});

test('mail user is undefined', () => {
  const mailUser = undefined;
  const users = createUsers();

  const emailExist = emailUserExist(users, mailUser);

  expect(emailExist).toBeFalsy();
});
