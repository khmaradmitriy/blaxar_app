require('dotenv').config();
const pool = require('../config/db');

async function dropItemIdColumn() {
  try {
    const [constraints] = await pool.query(`
      SELECT CONSTRAINT_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_NAME = 'Tasks'
        AND COLUMN_NAME = 'item_id'
        AND CONSTRAINT_SCHEMA = ?
        AND REFERENCED_TABLE_NAME IS NOT NULL
    `, [process.env.DB_NAME]);

    if (constraints.length > 0) {
      const constraintName = constraints[0].CONSTRAINT_NAME;
      console.log(`🔧 Удаление внешнего ключа ${constraintName}...`);
      await pool.execute(`ALTER TABLE Tasks DROP FOREIGN KEY \`${constraintName}\``);
      console.log(`✅ Внешний ключ ${constraintName} удалён.`);
    }

    const [columns] = await pool.query(`SHOW COLUMNS FROM Tasks LIKE 'item_id'`);
    if (columns.length > 0) {
      console.log(`🔧 Удаление поля item_id...`);
      await pool.execute(`ALTER TABLE Tasks DROP COLUMN item_id`);
      console.log('✅ Поле item_id успешно удалено.');
    } else {
      console.log('ℹ️ Поле item_id уже отсутствует.');
    }

  } catch (err) {
    console.error('❌ Ошибка:', err.message);
  } finally {
    pool.end();
  }
}

dropItemIdColumn();
