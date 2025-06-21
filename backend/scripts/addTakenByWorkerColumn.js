// 📁 scripts/addTakenByWorkerColumn.js
require('dotenv').config();
const pool = require('../config/db');

(async () => {
  try {
    await pool.execute(`
      ALTER TABLE Tasks
      ADD COLUMN taken_by_worker BOOLEAN DEFAULT 0
    `);
    console.log('✅ Поле taken_by_worker успешно добавлено');
    process.exit();
  } catch (err) {
    console.error('❌ Ошибка при добавлении поля taken_by_worker:', err.message);
    process.exit(1);
  }
})();
