// scripts/seedObjectsAndEstimates.js

const pool = require('../config/db');

const objects = [
  { name: 'Жилой комплекс «Северный»', description: 'Строительство жилых зданий на севере города' },
  { name: 'ТЦ «Галерея»', description: 'Торговый центр в центре города' },
  { name: 'Бизнес-парк «Орион»', description: 'Офисные здания для IT-компаний' },
  { name: 'Школа №25', description: 'Средняя школа на 1200 учеников' },
  { name: 'Спортивный комплекс «Волна»', description: 'Плавательный бассейн и спортивный зал' },
];

const generateEstimates = (objectId) => [
  {
    object_id: objectId,
    name: `Смета A для объекта ${objectId}`,
    status: 'draft',
  },
  {
    object_id: objectId,
    name: `Смета B для объекта ${objectId}`,
    status: 'pending',
  },
];

const seed = async () => {
  const conn = await pool.getConnection();

  try {
    console.log('🧹 Очистка таблиц...');
    await conn.query('DELETE FROM Estimates');
    await conn.query('DELETE FROM UserObjects');
    await conn.query('DELETE FROM Objects');

    console.log('🌱 Добавление объектов...');
    const objectIds = [];
    for (const obj of objects) {
      const [result] = await conn.execute(
        'INSERT INTO Objects (name, description, created_by) VALUES (?, ?, ?)',
        [obj.name, obj.description, 79] // предполагается, что user_id = 1 — админ или прораб
      );
      objectIds.push(result.insertId);
    }

    console.log('🧾 Добавление смет...');
    for (const objectId of objectIds) {
      const estimates = generateEstimates(objectId);
      for (const est of estimates) {
        await conn.execute(
          'INSERT INTO Estimates (object_id, name, status, created_by) VALUES (?, ?, ?, ?)',
          [est.object_id, est.name, est.status, 79]
        );
      }
    }

    console.log('✅ Данные успешно добавлены.');
  } catch (err) {
    console.error('❌ Ошибка при выполнении скрипта:', err);
  } finally {
    conn.release();
    process.exit();
  }
};

seed();
