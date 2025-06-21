const pool = require('../config/db');

// 🔹 Создать смету
const createEstimate = async ({ object_id, name, created_by }) => {
  const [result] = await pool.execute(
    `INSERT INTO Estimates (object_id, name, created_by)
     VALUES (?, ?, ?)`,
    [object_id, name, created_by]
  );
  return result.insertId;
};

// 🔹 Получить сметы по объекту
const getEstimatesByObject = async (objectId) => {
  const [rows] = await pool.execute(
    'SELECT * FROM Estimates WHERE object_id = ?',
    [objectId]
  );
  return rows;
};

// 🔹 Получить одну смету
const getEstimateById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT * FROM Estimates WHERE id = ?',
    [id]
  );
  return rows[0];
};

// 🔹 Обновить смету
const updateEstimate = async ({ id, name, status }) => {
  await pool.execute(
    'UPDATE Estimates SET name = ?, status = ? WHERE id = ?',
    [name, status, id]
  );
};

// 🔹 Удалить смету
const deleteEstimate = async (id) => {
  await pool.execute('DELETE FROM Estimates WHERE id = ?', [id]);
};

module.exports = {
  createEstimate,
  getEstimatesByObject,
  getEstimateById,
  updateEstimate,
  deleteEstimate,
};
