const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Clear dependent tables first
  await knex('users').del();
  await knex('roles').del();

  // Seed roles
  await knex('roles').insert([
    { id: 1, name: 'admin' },
    { id: 2, name: 'editor' },
    { id: 3, name: 'user' },
  ]);

  // Hash password
  const passwordHash = await bcrypt.hash('Test@123', 10);

  // Seed admin user
  await knex('users').insert([
    {
      name: 'Admin',
      email: 'admin@convegenius.ai',
      password: passwordHash,
      role_id: 1,
    },
  ]);
};
