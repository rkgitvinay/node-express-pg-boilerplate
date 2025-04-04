const retry = require('async-retry');
const knex = require('../database/index');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

/**
 * Knex service for SQL queries when you need fine-grained control over raw SQL
 * Writing complex analytics, reports, or joins that are not possible with ORM
 * Using transactions for multiple SQL operations that need to be atomic
 * Avoiding ORM abstraction for certain performance paths
 *
 * Features:
 * Using async-retry adds resilience to core SQL access layer.
 * Safe parameter binding to prevent SQL injection.
 * Centralized error handling for consistent logging and debugging
 * Transaction support ensures data integrity on multi-step operations
 */

/**
 * Usage: 
  
    const { selectOne, selectMany, execute, runTransaction } = require('../services/knex.service');

    const getUserByEmail = async (email) => {
        return await selectOne('SELECT * FROM users WHERE email = ?', [email]);
    };

    const getAllUsers = async () => {
        return await selectMany('SELECT * FROM users ORDER BY created_at DESC');
    };
    
    const deleteUser = async (userId) => {
        await execute('DELETE FROM users WHERE id = ?', [userId]);
    };
    
    const createUserWithLog = async (user, logMessage) => {
        return await runTransaction(async (trx) => {
            await execute('INSERT INTO users (email, name) VALUES (?, ?)', [user.email, user.name], trx);
            await execute('INSERT INTO audit_logs (message) VALUES (?)', [logMessage], trx);
        });
    };
 */

/**
 * Handles SQL errors globally
 */
const handleSQLError = (error, query, params) => {
  logger?.error?.('SQL Error:', { query, params, message: error.message });
  throw new ApiError(500, 'Internal server error', 'DB_ERROR');
};

/**
 * SELECT one row with retry on transient DB issues like: Timeouts, Deadlocks, Connection drops
 * @param {string} query
 * @param {array} params
 * @param {object} trx
 * @returns {object|null}
 */
const selectOne = async (query, params = [], trx = null) => {
  try {
    const db = trx || knex;
    const result = await retry(() => db.raw(query, params), { retries: 2 });
    return result.rows[0] || null;
  } catch (error) {
    handleSQLError(error, query, params);
  }
};

/**
 * SELECT multiple rows
 */
const selectMany = async (query, params = [], trx = null) => {
  try {
    const db = trx || knex;
    const result = await retry(() => db.raw(query, params), { retries: 2 });
    return result.rows || [];
  } catch (error) {
    handleSQLError(error, query, params);
  }
};

/**
 * Execute INSERT / UPDATE / DELETE (no return expected)
 */
const execute = async (query, params = [], trx = null) => {
  try {
    const db = trx || knex;
    return await retry(() => db.raw(query, params), { retries: 2 });
  } catch (error) {
    handleSQLError(error, query, params);
  }
};

/**
 * Transaction wrapper
 */
const runTransaction = async (callbackFn) => {
  return await knex.transaction(async (trx) => {
    try {
      return await callbackFn(trx);
    } catch (error) {
      handleSQLError(error, '', {});
    }
  });
};

module.exports = {
  selectOne,
  selectMany,
  execute,
  runTransaction,
};
