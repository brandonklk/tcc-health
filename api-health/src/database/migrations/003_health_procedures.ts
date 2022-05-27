import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('health_procedures', table => {
    table.increments('procedures_id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.integer('type_procedures').notNullable();
    table.string('procedures_uuid').notNullable();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.user_id');
    table.timestamp('create_date').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('health_procedures');
}
