const pool = require('../config/db');

(async () => {
  try {
    console.log('🧹 Очистка пользователей с фамилией "Тестов"...');
    const [users] = await pool.execute("SELECT id FROM Users WHERE surname = 'Тестов'");
    const ids = users.map(u => u.id);

    if (ids.length > 0) {
      await pool.execute("DELETE FROM UserObjects WHERE user_id IN (?)", [ids]);
      await pool.execute("DELETE FROM History WHERE user_id IN (?)", [ids]);
      await pool.execute("DELETE FROM Users WHERE id IN (?)", [ids]);
      console.log(`🗑️ Удалено: ${ids.length} пользователь(ей)`);
    }

    const passwordHash = '$2a$10$7Q1yEV32Nh4G9SeJjWI3YO7vRpj5OfGnNhSFe2xR7XtSC1MQH9uFO'; // 'test123'

    await pool.execute(`
      INSERT INTO Users (surname, name, patronymic, birth_date, role, password_hash)
      VALUES (?, ?, ?, ?, ?, ?)`,
      ['Тестов', 'Тест', 'Тестович', '1990-01-01', 'foreman', passwordHash]
    );

    console.log('✅ Новый пользователь "Тестов" создан.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Ошибка:', err);
    process.exit(1);
  }
})();
