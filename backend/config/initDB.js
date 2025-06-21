const pool = require('./db');
const tables = require('../mysql/schema');

const initDB = async () => {
  console.log('📦 Проверка и инициализация таблиц...');
  for (const [name, sql] of Object.entries(tables)) {
    try {
      await pool.execute(sql);
      console.log(`✅ Таблица ${name} — ОК`);
    } catch (err) {
      console.error(`❌ Ошибка создания таблицы ${name}:`, err.message);
    }
  }
};

module.exports = initDB;
