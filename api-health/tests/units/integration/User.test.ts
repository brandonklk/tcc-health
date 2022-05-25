import supertest from 'supertest';
import server from '../../../src/server';
import connectionDB from '../../../src/database/connection';

describe('controller of user', () => [
  beforeEach(async () => {
    await connectionDB.migrate.rollback();
    await connectionDB.migrate.latest();
  }),

  afterAll(async () => {
    await connectionDB.destroy();
  }),

  it('create new user with values corrects', async () => {
    const response = await supertest(server).post('/create-user').send({
      name: 'josé',
      email: 'teste@teste1.com',
      password: '12345678',
      phone: '111111111',
      role: 'ADMIN',
      language: 'PT',
    });

    console.log(response);

    expect(response.body).toEqual({
      msg: 'Usuário criado com sucesso.',
      type: 'success',
    });
  }),
]);
