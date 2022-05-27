import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('files', table => {
    table.increments('files_id').primary();
    table.string('title').notNullable();
    table.string('title_storage').notNullable();
    // table.integer('procedures_id').unsigned();
    // table
    //   .foreign('procedures_id')
    //   .references('health_procedures.procedures_id');
    table.timestamp('create_date').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('files');
}
