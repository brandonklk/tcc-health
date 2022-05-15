import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_accesses', table => {
    table.increments('accesses_id').primary();
    table.boolean('is_admin').notNullable();
    table.boolean('is_health').notNullable();
    table.boolean('is_simple').notNullable()
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_accesses');
}
