const pool = require('../config/db');

const alterTable = async () => {
  try {
    await pool.execute(`ALTER TABLE Tasks ADD COLUMN refused_once BOOLEAN DEFAULT FALSE`);
    console.log('✅ Поле refused_once добавлено');
  } catch (err) {
    if (err.message.includes('Duplicate column')) {
      console.log('ℹ️ Поле уже существует');
    } else {
      console.error('❌ Ошибка:', err.message);
    }
  } finally {
    process.exit();
  }
};

alterTable();
