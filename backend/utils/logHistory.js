// utils/logHistory.js
const pool = require('../config/db');

/**
 * Логгирует любое действие пользователя
 * @param {'object' | 'estimate' | 'user' | string} entityType
 * @param {number} entityId
 * @param {string} action
 * @param {number} userId
 */
async function logHistory(entityType, entityId, action, userId) {
  await pool.execute(
    `INSERT INTO History (entity_type, entity_id, action, user_id, timestamp)
     VALUES (?, ?, ?, ?, NOW())`,
    [entityType, entityId, action, userId]
  );
}

module.exports = logHistory;

