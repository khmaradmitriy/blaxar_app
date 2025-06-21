const pool = require('../config/db');

const createEstimatesTables = async () => {
  try {
    console.log('📦 Создание таблиц Estimates...');

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS Estimates (
        id INT AUTO_INCREMENT PRIMARY KEY,
        object_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        status ENUM('draft', 'pending', 'approved', 'rejected', 'completed') DEFAULT 'draft',
        created_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (object_id) REFERENCES Objects(id) ON DELETE CASCADE,
        FOREIGN KEY (created_by) REFERENCES Users(id) ON DELETE CASCADE
      )
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS EstimatePositions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        estimate_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        unit VARCHAR(50),
        quantity DECIMAL(10, 2),
        price DECIMAL(12, 2),
        category ENUM('работы', 'материалы', 'логистика') NOT NULL,
        source ENUM('from_price', 'custom') DEFAULT 'custom',
        FOREIGN KEY (estimate_id) REFERENCES Estimates(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ Таблицы Estimates и EstimatePositions созданы');
    process.exit();
  } catch (err) {
    console.error('❌ Ошибка создания таблиц Estimates:', err);
    process.exit(1);
  }
};

createEstimatesTables();
