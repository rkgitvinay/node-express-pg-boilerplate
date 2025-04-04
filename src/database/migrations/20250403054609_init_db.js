/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('roles', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.timestamps(true, true);
    })
    .then(() => {
      return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.integer('role_id').unsigned().notNullable();
        table.foreign('role_id').references('id').inTable('roles').onDelete('CASCADE');
        table.timestamps(true, true);
      });
    })
    .then(() => {
      return knex.schema.createTable('tokens', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.string('token').notNullable().unique();
        table.string('type').notNullable();
        table.boolean('blacklisted').defaultTo(false);
        table.timestamp('expires_at').notNullable();
        table.timestamps(true, true);
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users').then(() => knex.schema.dropTableIfExists('roles'));
};
