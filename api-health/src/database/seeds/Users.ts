import { Knex } from 'knex';
import { IUsers } from '@interfaces/index';

export const seed = async (knex: Knex) => {
  // Deletes ALL existing entries
  await knex('users').del();

  const password = process.env.PWD_USER;

  // Inserts seed entries
  await knex<IUsers[]>('users').insert([
    {
      user_id: 1,
      name: 'Suporte',
      email: 'suporte.ht@teste.com',
      password,
      create_date: new Date(),
    },
  ]);
};
