import { Knex } from "knex";
import { format } from "date-fns";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
        table.increments('user_id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('phone');
        table.timestamp('create_date').notNullable();
        table.integer('avatar_id').unsigned();
        table.foreign('avatar_id').references('files.files_id');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

