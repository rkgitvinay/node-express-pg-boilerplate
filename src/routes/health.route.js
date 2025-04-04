const express = require('express');

const router = express.Router();
const knex = require('../database/index');

router.get('/', async (req, res) => {
  let dbStatus = 'up';

  try {
    await knex.raw('SELECT 1');
  } catch (err) {
    dbStatus = 'down';
  }

  res.status(dbStatus === 'up' ? 200 : 503).json({
    status: 'ok',
    uptime: process.uptime(),
    db: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
