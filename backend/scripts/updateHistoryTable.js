const pool = require('../config/db');

const dropAndCreateHistoryTable = async () => {
  try {
    console.log('🧨 Удаление старой таблицы History (если есть)...');
    await pool.execute('DROP TABLE IF EXISTS History');

    console.log('📦 Создание новой таблицы History...');
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS History (
        id INT AUTO_INCREMENT PRIMARY KEY,
        entity_type VARCHAR(50) NOT NULL,
        entity_id INT NOT NULL,
        action VARCHAR(255) NOT NULL,
        user_id INT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Таблица History успешно обновлена!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Ошибка при обновлении таблицы History:', err);
    process.exit(1);
  }
};

dropAndCreateHistoryTable();
