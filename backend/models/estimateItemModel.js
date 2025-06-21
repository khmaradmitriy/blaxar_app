const pool = require('../config/db');

// 🔹 Создание позиции в смете
exports.createItem = async ({ estimate_id, name, unit, price, quantity, category }) => {
  const [result] = await pool.execute(
    `INSERT INTO EstimateItems (estimate_id, name, unit, price, quantity, category)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [estimate_id, name, unit, price, quantity, category]
  );
  return result.insertId;
};

// 🔹 Получить все позиции по смете
exports.getItemsByEstimate = async (estimate_id) => {
  const [rows] = await pool.execute(
    `SELECT * FROM EstimateItems WHERE estimate_id = ?`,
    [estimate_id]
  );
  return rows;
};

// 🔹 Обновить позицию
exports.updateItem = async ({ id, name, unit, price, quantity, category }) => {
  await pool.execute(
    `UPDATE EstimateItems
     SET name = ?, unit = ?, price = ?, quantity = ?, category = ?
     WHERE id = ?`,
    [name, unit, price, quantity, category, id]
  );
};

// 🔹 Удалить позицию
exports.deleteItem = async (id) => {
  await pool.execute(`DELETE FROM EstimateItems WHERE id = ?`, [id]);
};
