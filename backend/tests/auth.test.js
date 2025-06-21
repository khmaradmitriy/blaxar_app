const request = require('supertest');
const app = require('../server');
const pool = require('../config/db');
const initDB = require('../config/initDB');

const TEST_EMAIL = 'test@example.com';

describe('Авторизация', () => {
  beforeAll(async () => {
    await initDB();
    await pool.execute('DELETE FROM Users WHERE email = ?', [TEST_EMAIL]);
    await pool.execute(
      `INSERT INTO Users (email, surname, name, patronymic, birth_date, role, password_hash)
       VALUES (?, 'Тестов', 'Тест', 'Тестович', '1990-01-01', 'foreman', ?)`
      , [TEST_EMAIL, await require('bcryptjs').hash('test123', 10)]
    );
  });

  it('Успешный вход', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: TEST_EMAIL, password: 'test123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.user).toMatchObject({ id: expect.any(Number), role: 'foreman' });
  });

  it('Ошибка при неправильном пароле', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: TEST_EMAIL, password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Неверный пароль/);
  });

  it('Повторная регистрация с тем же email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: TEST_EMAIL,
        surname: 'Повтор',
        name: 'Тест',
        birth_date: '1990-01-01',
        role: 'foreman',
        password: 'newpass123'
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/Email уже зарегистрирован/);
  });

  afterAll(async () => {
    await pool.execute('DELETE FROM Users WHERE email = ?', [TEST_EMAIL]);
    await pool.end();
  });
});
