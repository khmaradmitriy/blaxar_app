// scripts/addAdjustedPriceColumn.js
const pool = require('../config/db');

const addColumn = async () => {
  try {
    const sql = `
      ALTER TABLE EstimateItems
      ADD COLUMN adjusted_price DECIMAL(10,2) AFTER price;
    `;

    await pool.execute(sql);
    console.log('✅ Поле "adjusted_price" успешно добавлено в таблицу EstimateItems.');
    process.exit(0);
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('⚠️ Поле "adjusted_price" уже существует.');
    } else {
      console.error('❌ Ошибка добавления поля:', err.message);
    }
    process.exit(1);
  }
};

addColumn();
