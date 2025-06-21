const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const { jwtSecret, refreshSecret, tokenExpire, refreshExpire } = require('../config/jwt');

const refreshTokens = new Set();

exports.getMe = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT id, email, surname, name, patronymic, birth_date, role, created_at
      FROM Users
      WHERE id = ?
    `, [req.user.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('❌ Ошибка получения текущего пользователя:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
exports.register = async (req, res) => {
  const { email, password, surname, name, patronymic, birth_date, role } = req.body;

  // Простая валидация
  if (!email || !password) {
    return res.status(400).json({ message: 'Email и пароль обязательны' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Неверный формат email' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Пароль должен содержать минимум 6 символов' });
  }

  try {
    // Проверка наличия email
    const [existing] = await pool.execute('SELECT id FROM Users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Пользователь с таким email уже существует. Попробуйте войти.' });
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.execute(`
      INSERT INTO Users (email, surname, name, patronymic, birth_date, role, password_hash)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [email, surname || '', name || '', patronymic || '', birth_date || null, role || 'worker', hashed]);

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (err) {
    console.error('❌ Ошибка регистрации:', err);
    res.status(500).json({ message: 'Ошибка регистрации' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('🔐 Попытка входа:', { email });

  try {
    const [rows] = await pool.execute('SELECT * FROM Users WHERE email = ?', [email]);
    console.log('👤 Найдено пользователей:', rows.length);

    if (rows.length === 0) {
      console.warn('⚠️ Пользователь не найден');
      return res.status(401).json({ message: 'Пользователь не найден' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      console.warn('⚠️ Неверный пароль');
      return res.status(401).json({ message: 'Неверный пароль' });
    }
    if (user.is_blocked) {
  console.warn('⚠️ Пользователь заблокирован');
  return res.status(403).json({ message: 'Пользователь заблокирован. Свяжитесь с администратором' });
}
    const { accessToken, refreshToken } = generateTokens({ id: user.id, role: user.role });

    res.json({
      accessToken,
      refreshToken,
      user: { id: user.id, role: user.role, email: user.email },
    });
  } catch (err) {
    console.error('❌ Ошибка входа:', err);
    res.status(500).json({ message: 'Ошибка входа' });
  }
};

exports.refreshToken = (req, res) => {
  const { token } = req.body || {};

  if (!token || !refreshTokens.has(token)) {
    return res.status(403).json({ message: 'Недействительный refreshToken' });
  }

  jwt.verify(token, refreshSecret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Ошибка верификации' });

    const newAccessToken = jwt.sign({ id: user.id, role: user.role }, jwtSecret, {
      expiresIn: tokenExpire,
    });
    res.json({ accessToken: newAccessToken });
  });
};


exports.logout = (req, res) => {
  const { token } = req.body;
  refreshTokens.delete(token);
  res.json({ message: 'Выход выполнен' });
};

function generateTokens(payload) {
  const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: tokenExpire });
  const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: refreshExpire });
  refreshTokens.add(refreshToken);
  return { accessToken, refreshToken };
}
