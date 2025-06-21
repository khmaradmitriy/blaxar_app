const pool = require('../config/db');

(async () => {
  try {
    // Проверка: есть ли колонка `email`
    const [columns] = await pool.execute(`SHOW COLUMNS FROM Users LIKE 'email'`);

    if (columns.length > 0) {
      console.log('✅ Колонка `email` уже существует.');
    } else {
      // Добавляем колонку
      await pool.execute(`
        ALTER TABLE Users
        ADD COLUMN email VARCHAR(255) NOT NULL UNIQUE
      `);
      console.log('✅ Колонка `email` успешно добавлена.');
    }
  } catch (err) {
    console.error('❌ Ошибка при добавлении колонки `email`:', err);
  } finally {
    await pool.end();
  }
})();
