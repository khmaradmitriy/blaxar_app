const pool = require('../config/db');
const logHistory = require('../utils/logHistory');

// Получить список всех пользователей (только админ)
exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT id, email, surname, name, patronymic, birth_date, role, is_blocked, created_at
  FROM Users
    `);
    res.json(rows);
  } catch (err) {
    console.error('Ошибка получения пользователей:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};


exports.blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute('UPDATE Users SET is_blocked = 1 WHERE id = ?', [id]);
    res.json({ message: 'Пользователь заблокирован' });
  } catch (err) {
    console.error('Ошибка блокировки пользователя:', err);
    res.status(500).json({ message: 'Ошибка при блокировке пользователя' });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute('UPDATE Users SET is_blocked = 0 WHERE id = ?', [id]);
    res.json({ message: 'Пользователь разблокирован' });
  } catch (err) {
    console.error('Ошибка разблокировки пользователя:', err);
    res.status(500).json({ message: 'Ошибка при разблокировке пользователя' });
  }
};