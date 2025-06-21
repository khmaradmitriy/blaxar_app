const pool = require('../config/db');

exports.getAllPrices = async () => {
  const [rows] = await pool.execute(`SELECT * FROM Prices ORDER BY name`);
  return rows;
};

exports.getPriceById = async (id) => {
  const [rows] = await pool.execute(`SELECT * FROM Prices WHERE id = ?`, [id]);
  return rows[0];
};

exports.createPrice = async ({ name, unit, price, category }) => {
  const [result] = await pool.execute(
    `INSERT INTO Prices (name, unit, price, category) VALUES (?, ?, ?, ?)`,
    [name, unit, price, category]
  );
  return result.insertId;
};

exports.updatePrice = async (id, { name, unit, price, category }) => {
  await pool.execute(
    `UPDATE Prices SET name = ?, unit = ?, price = ?, category = ? WHERE id = ?`,
    [name, unit, price, category, id]
  );
};

exports.deletePrice = async (id) => {
  await pool.execute(`DELETE FROM Prices WHERE id = ?`, [id]);
};
