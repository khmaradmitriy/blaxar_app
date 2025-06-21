const pool = require('../config/db');

exports.getByTask = async (taskId) => {
  const [rows] = await pool.execute(`
    SELECT ti.*, ei.name, ei.unit, ei.adjusted_price
    FROM TaskItems ti
    JOIN EstimateItems ei ON ti.estimate_item_id = ei.id
    WHERE ti.task_id = ?
  `, [taskId]);
  return rows;
};

exports.create = async ({ task_id, estimate_item_id, quantity }) => {
  const [result] = await pool.execute(`
    INSERT INTO TaskItems (task_id, estimate_item_id, quantity)
    VALUES (?, ?, ?)
  `, [task_id, estimate_item_id, quantity]);
  return result.insertId;
};

exports.update = async (id, quantity) => {
  await pool.execute(`
    UPDATE TaskItems
    SET quantity = ?
    WHERE id = ?
  `, [quantity, id]);
};

exports.remove = async (id) => {
  await pool.execute(`
    DELETE FROM TaskItems
    WHERE id = ?
  `, [id]);
};
