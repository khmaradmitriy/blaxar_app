const pool = require('../config/db');

exports.getAvailableTasks = async () => {
  const [rows] = await pool.execute(`
    SELECT * FROM Tasks
    WHERE worker_id IS NULL
    ORDER BY created_at ASC
  `);
  return rows;
};

exports.getActiveTasksByWorker = async (workerId) => {
  const [rows] = await pool.execute(`
    SELECT * FROM Tasks
    WHERE worker_id = ? AND status IN ('created', 'in_progress')
  `, [workerId]);
  return rows;
};

exports.getAllByWorker = async (workerId) => {
  const [rows] = await pool.execute(`
    SELECT * FROM Tasks
    WHERE worker_id = ?
    ORDER BY created_at DESC
  `, [workerId]);
  return rows;
};

exports.assignTask = async (taskId, workerId, takenByWorker = false) => {
  await pool.execute(`
    UPDATE Tasks
    SET worker_id = ?, status = 'in_progress', taken_by_worker = ?
    WHERE id = ?
  `, [workerId, takenByWorker ? 1 : 0, taskId]);
};

exports.refuseTask = async (taskId) => {
  await pool.execute(`
    UPDATE Tasks
    SET worker_id = NULL, status = 'created', refused_once = 1
    WHERE id = ?
  `, [taskId]);
};

exports.getById = async (taskId) => {
  const [rows] = await pool.execute('SELECT * FROM Tasks WHERE id = ?', [taskId]);
  return rows[0];
};

exports.updateStatus = async (id, status) => {
  await pool.execute(`UPDATE Tasks SET status = ? WHERE id = ?`, [status, id]);
};
