require('dotenv').config();
const pool = require('../config/db');

const setUserRole = async (userId, newRole) => {
  try {
    const validRoles = ['admin', 'foreman', 'worker'];
    if (!validRoles.includes(newRole)) {
      console.error('❌ Недопустимая роль. Возможные значения:', validRoles.join(', '));
      process.exit(1);
    }

    const [result] = await pool.execute(
      'UPDATE Users SET role = ? WHERE id = ?',
      [newRole, userId]
    );

    if (result.affectedRows === 0) {
      console.log('⚠️ Пользователь не найден');
    } else {
      console.log(`✅ Роль пользователя #${userId} обновлена на "${newRole}"`);
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Ошибка при обновлении роли:', err.message);
    process.exit(1);
  }
};

// Аргументы командной строки
const [, , userId, role] = process.argv;

if (!userId || !role) {
  console.error('⚠️ Использование: node scripts/setUserRole.js <userId> <role>');
  process.exit(1);
}

setUserRole(userId, role);
