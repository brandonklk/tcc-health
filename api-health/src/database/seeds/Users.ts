import { Knex } from 'knex';
import { IUsers } from '@interfaces/index';

export const seed = async (knex: Knex) => {
  // Deletes ALL existing entries
  await knex('users').del();

  const password =
    '$2b$09$xHgeIFAi8YrodDxlrurQKuHNMeYY1Fq1Xreqr8W.aUE3F421aWJxa'; //process.env.PWD_USER;

  // Inserts seed entries
  await knex('users').insert([
    {
      user_id: 1,
      name: 'Suporte',
      email: 'suporte.ht@teste.com',
      password,
      create_date: new Date(),
    },
  ]);
};
