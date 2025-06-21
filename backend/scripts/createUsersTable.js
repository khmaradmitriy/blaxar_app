const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('📡 Подключение к базе данных успешно');

    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        surname VARCHAR(100),
        name VARCHAR(100),
        patronymic VARCHAR(100),
        birth_date DATE,
        role ENUM('admin', 'foreman', 'worker') NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await connection.execute(createTableSQL);
    console.log('✅ Таблица Users создана или уже существует');

    await connection.end();
  } catch (err) {
    console.error('❌ Ошибка при создании таблицы Users:', err);
    process.exit(1);
  }
})();
