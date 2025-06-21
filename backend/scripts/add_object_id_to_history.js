const pool = require('../config/db');

async function addColumn() {
  try {
    console.log('📌 Подключение к базе данных...');

    const [rows] = await pool.query(`
      SHOW COLUMNS FROM History LIKE 'object_id'
    `);

    if (rows.length === 0) {
      await pool.query(`
        ALTER TABLE History
        ADD COLUMN object_id INT NOT NULL AFTER user_id
      `);
      console.log('✅ Колонка "object_id" успешно добавлена в таблицу History');
    } else {
      console.log('ℹ️ Колонка "object_id" уже существует — ничего менять не нужно');
    }

    await pool.end();
    console.log('🔌 Подключение закрыто.');
  } catch (err) {
    console.error('❌ Ошибка при обновлении схемы:', err);
    process.exit(1);
  }
}

addColumn();
