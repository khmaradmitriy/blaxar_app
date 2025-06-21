require('dotenv').config();
const pool = require('../config/db');

const createTable = async () => {
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS TaskItems (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task_id INT NOT NULL,
        estimate_item_id INT NOT NULL,
        quantity DECIMAL(10,2),
        FOREIGN KEY (task_id) REFERENCES Tasks(id) ON DELETE CASCADE,
        FOREIGN KEY (estimate_item_id) REFERENCES EstimateItems(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ Таблица TaskItems создана или уже существует');
    process.exit(0);
  } catch (err) {
    console.error('❌ Ошибка при создании таблицы TaskItems:', err.message);
    process.exit(1);
  }
};

createTable();
