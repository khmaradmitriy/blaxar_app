const pool = require('../config/db');

// Получить объекты, доступные пользователю по роли
const getObjectsByUser = async (user) => {
  if (user.role === 'admin') {
    const [rows] = await pool.execute('SELECT * FROM Objects');
    return rows;
  }

  if (user.role === 'foreman') {
    const [rows] = await pool.execute(
      `SELECT o.* FROM Objects o
       JOIN UserObjects uo ON o.id = uo.object_id
       WHERE uo.user_id = ?`,
      [user.id],
    );
    return rows;
  }

  if (user.role === 'worker') {
    const [rows] = await pool.execute(
      `SELECT o.* FROM Objects o
       JOIN UserObjects uo ON o.id = uo.object_id
       WHERE uo.user_id = ?`,
      [user.id],
    );
    return rows;
  }

  return [];
};

// Создать объект
const createObject = async ({ name, description, created_by }) => {
  const [result] = await pool.execute(
    'INSERT INTO Objects (name, description, created_by) VALUES (?, ?, ?)',
    [name, description, created_by],
  );
  return result.insertId;
};

// Обновить объект
const updateObject = async ({ id, name, description }) => {
  await pool.execute('UPDATE Objects SET name = ?, description = ? WHERE id = ?', [
    name,
    description,
    id,
  ]);
};

// Получить один объект
const getObjectById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM Objects WHERE id = ?', [id]);
  return rows[0];
};

// Назначить прораба
const attachForeman = async (userId, objectId) => {
  await pool.execute('INSERT IGNORE INTO UserObjects (user_id, object_id) VALUES (?, ?)', [
    userId,
    objectId,
  ]);
};

// Удалить связь прораба с объектом
const detachForeman = async (userId, objectId) => {
  await pool.execute('DELETE FROM UserObjects WHERE user_id = ? AND object_id = ?', [
    userId,
    objectId,
  ]);
};

module.exports = {
  getObjectsByUser,
  createObject,
  updateObject,
  getObjectById,
  attachForeman,
  detachForeman,
};
