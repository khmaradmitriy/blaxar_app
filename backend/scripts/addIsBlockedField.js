const pool = require('../config/db');

(async () => {
  try {
    console.log('🔍 Проверка наличия поля is_blocked в таблице Users...');

    const [columns] = await pool.execute(`SHOW COLUMNS FROM Users LIKE 'is_blocked'`);

    if (columns.length === 0) {
      console.log('➕ Добавление поля is_blocked...');
      await pool.execute(`ALTER TABLE Users ADD COLUMN is_blocked BOOLEAN DEFAULT FALSE`);
      console.log('✅ Поле is_blocked успешно добавлено.');
    } else {
      console.log('✅ Поле is_blocked уже существует. Ничего делать не нужно.');
    }

    await pool.end();
  } catch (err) {
    console.error('❌ Ошибка при добавлении поля is_blocked:', err);
    process.exit(1);
  }
})();
