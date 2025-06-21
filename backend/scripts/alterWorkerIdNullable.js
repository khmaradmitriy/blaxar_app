require('dotenv').config();
const pool = require('../config/db');

async function alterWorkerIdNullable() {
  try {
    const conn = await pool.getConnection();
    console.log('🔧 Изменение поля worker_id на NULLABLE...');

    await conn.execute(`
      ALTER TABLE Tasks MODIFY worker_id INT NULL;
    `);

    conn.release();
    console.log('✅ Поле worker_id теперь допускает NULL');
  } catch (err) {
    console.error('❌ Ошибка при изменении поля worker_id:', err.message);
  }
}

alterWorkerIdNullable();
