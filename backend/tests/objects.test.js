const request = require('supertest');
const app = require('../server');
const pool = require('../config/db');
const initDB = require('../config/initDB');

let accessToken = '';
let createdObjectId = null;

beforeAll(async () => {
  await initDB();

  await pool.execute("DELETE FROM Users WHERE surname = 'Тестов'");
  await pool.execute(`
    INSERT INTO Users (surname, name, patronymic, birth_date, role, password_hash)
    VALUES ('Тестов', 'Тест', 'Тестович', '1990-01-01', 'foreman', '$2a$10$7Q1yEV32Nh4G9SeJjWI3YO7vRpj5OfGnNhSFe2xR7XtSC1MQH9uFO')
  `);

  const res = await request(app)
    .post('/api/auth/login')
    .send({ surname: 'Тестов', password: 'test123' });

  accessToken = res.body.accessToken;
});

describe('Работа с объектами', () => {
  it('Создание объекта', async () => {
    const res = await request(app)
      .post('/api/objects')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: 'Объект 1', description: 'Описание 1' });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    createdObjectId = res.body.id;
  });

  it('Обновление объекта', async () => {
    const res = await request(app)
      .put(`/api/objects/${createdObjectId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: 'Объект 1.1', description: 'Новое описание' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Объект обновлён');
  });

  it('Получение списка объектов', async () => {
    const res = await request(app)
      .get('/api/objects')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

afterAll(async () => {
  if (createdObjectId) {
    await pool.execute('DELETE FROM UserObjects WHERE object_id = ?', [createdObjectId]);
    await pool.execute('DELETE FROM Objects WHERE id = ?', [createdObjectId]);
  }
  await pool.execute("DELETE FROM Users WHERE surname = 'Тестов'");
  await pool.end();
});
