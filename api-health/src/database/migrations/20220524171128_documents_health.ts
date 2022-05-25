import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('documents_health', table => {
    table.increments('documento_health_id').primary();

    table.integer('files_id').unsigned();
    table.foreign('files_id').references('files.files_id');

    table.integer('procedures_id').unsigned();
    table
      .foreign('procedures_id')
      .references('health_procedures.procedures_id');

    table.timestamp('create_date').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('documents_health');
}
