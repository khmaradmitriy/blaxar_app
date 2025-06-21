require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const createWorker = async () => {
  const email = 'worker1@example.com';
  const surname = 'Иванов';
  const name = 'Алексей';
  const patronymic = 'Петрович';
  const birth_date = '1995-06-15';
  const role = 'worker';
  const plainPassword = 'worker123';

  try {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const [existing] = await pool.execute('SELECT id FROM Users WHERE email = ?', [email]);
    if (existing.length) {
      console.log('⚠️ Пользователь уже существует с этим email');
      return;
    }

    const [result] = await pool.execute(
      `INSERT INTO Users (email, surname, name, patronymic, birth_date, role, password_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [email, surname, name, patronymic, birth_date, role, hashedPassword]
    );

    console.log(`✅ Монтажник успешно создан. ID: ${result.insertId}`);
  } catch (err) {
    console.error('❌ Ошибка при создании пользователя:', err.message);
  } finally {
    pool.end();
  }
};

createWorker();
