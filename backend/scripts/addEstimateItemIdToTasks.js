const pool = require('../config/db');

const addColumn = async () => {
  try {
    const sql = `
      ALTER TABLE Tasks
      ADD COLUMN estimate_item_id INT AFTER id,
      ADD CONSTRAINT fk_estimate_item
        FOREIGN KEY (estimate_item_id) REFERENCES EstimateItems(id)
        ON DELETE CASCADE;
    `;

    await pool.execute(sql);
    console.log('✅ Поле "estimate_item_id" добавлено в таблицу Tasks и связана с EstimateItems.');
    process.exit(0);
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('⚠️ Поле "estimate_item_id" уже существует.');
    } else {
      console.error('❌ Ошибка при добавлении поля:', err.message);
    }
    process.exit(1);
  }
};

addColumn();
