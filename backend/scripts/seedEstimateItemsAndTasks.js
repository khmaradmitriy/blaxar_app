require('dotenv').config();
const pool = require('../config/db');

const estimateItemSamples = [
  [27, "Монтаж кабель-канала 25x16", "м", 45.00, 30.00, "работа"],
  [27, "Установка подрозетников", "шт", 30.00, 25.00, "работа"],
  [27, "Прокладка кабеля ВВГнг 3x2.5", "м", 32.00, 30.00, "материал"],
  [29, "Монтаж УЗО", "шт", 200.00, 180.00, "работа"],
  [29, "Установка щитка", "шт", 700.00, 650.00, "работа"],
  [29, "Штробление стен", "м", 90.00, 80.00, "работа"],
  [31, "Сборка ВРУ", "шт", 1500.00, 1400.00, "работа"],
  [31, "Монтаж гофры", "м", 20.00, 18.00, "материал"],
  [31, "Заземление", "шт", 250.00, 230.00, "работа"],
  [33, "Установка люстр", "шт", 300.00, 280.00, "работа"],
  [33, "Подключение розеток", "шт", 150.00, 140.00, "работа"],
  [33, "Монтаж розеток с заземлением", "шт", 120.00, 100.00, "работа"],
  [35, "Прокладка кабеля КГ", "м", 70.00, 65.00, "материал"],
  [35, "Установка автоматов", "шт", 90.00, 85.00, "работа"],
  [35, "Пайка проводов", "м", 50.00, 45.00, "работа"],
  [27, "Монтаж светильников", "шт", 250.00, 230.00, "работа"],
  [29, "Установка УЗО", "шт", 200.00, 190.00, "работа"],
  [31, "Прокладка силовых линий", "м", 95.00, 90.00, "работа"],
  [33, "Тестирование сети", "шт", 180.00, 170.00, "работа"],
  [35, "Монтаж распределительных коробок", "шт", 90.00, 85.00, "работа"]
];

async function seed() {
  const conn = await pool.getConnection();

  try {
    console.log('🧹 Очистка таблиц...');
    await conn.query('DELETE FROM Tasks');
    await conn.query('DELETE FROM EstimateItems');
    console.log('✅ Очистка завершена');

    console.log('📦 Добавление позиций EstimateItems...');
    const estimateItemIds = [];

    for (const item of estimateItemSamples) {
      const [result] = await conn.execute(
        `INSERT INTO EstimateItems (estimate_id, name, unit, price, adjusted_price, category)
         VALUES (?, ?, ?, ?, ?, ?)`,
        item
      );
      estimateItemIds.push({ id: result.insertId, estimate_id: item[0] });
    }

    console.log('📦 Генерация задач Tasks (все задачи не назначены)...');
    for (const { id: estimateItemId, estimate_id } of estimateItemIds) {
      const quantity = Math.floor(Math.random() * 20) + 5;
      const percent = [70, 80, 90, 100][Math.floor(Math.random() * 4)];
      const comment = '';
      const status = 'created';

      await conn.execute(
        `INSERT INTO Tasks (estimate_item_id, estimate_id, quantity, percent, comment, status)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [estimateItemId, estimate_id, quantity, percent, comment, status]
      );
    }

    console.log('🎉 Все данные успешно добавлены');
  } catch (err) {
    console.error('❌ Ошибка при выполнении скрипта:', err);
  } finally {
    conn.release();
    process.exit();
  }
}

seed();
