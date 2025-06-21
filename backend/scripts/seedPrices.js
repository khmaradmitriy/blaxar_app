const axios = require('axios');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzksInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0OTk5MDYxMiwiZXhwIjoxNzQ5OTkxNTEyfQ.RkpDMEoMhixkgoZqPbspCKoX0-oclYnuuuIf6tSMonw'; // вставь сюда актуальный токен

const prices = [
  { "name": "Прокладка кабеля ВВГнг-LS 3x2.5", "unit": "м", "price": 35.00, "category": "материал" },
  { "name": "Монтаж розетки с заземлением", "unit": "шт", "price": 120.00, "category": "работа" },
  { "name": "Установка распределительной коробки", "unit": "шт", "price": 90.00, "category": "работа" },
  { "name": "Автоматический выключатель 16А", "unit": "шт", "price": 150.00, "category": "материал" },
  { "name": "Сборка электрического щита на 6 модулей", "unit": "шт", "price": 800.00, "category": "работа" },
  { "name": "Прокладка гофры D16", "unit": "м", "price": 12.00, "category": "материал" },
  { "name": "Установка люстры", "unit": "шт", "price": 300.00, "category": "работа" },
  { "name": "Монтаж теплого пола", "unit": "м²", "price": 400.00, "category": "работа" },
  { "name": "Прокладка кабеля КГ 3x4", "unit": "м", "price": 70.00, "category": "материал" },
  { "name": "Установка автомата в щит", "unit": "шт", "price": 90.00, "category": "работа" },
  { "name": "Трасса под кондиционер", "unit": "м", "price": 450.00, "category": "работа" },
  { "name": "Коробка распаечная IP55", "unit": "шт", "price": 45.00, "category": "материал" },
  { "name": "Штробление под провод", "unit": "м", "price": 85.00, "category": "работа" },
  { "name": "Монтаж УЗО", "unit": "шт", "price": 200.00, "category": "работа" },
  { "name": "Монтаж электросчетчика", "unit": "шт", "price": 550.00, "category": "работа" },
  { "name": "Доставка кабеля", "unit": "рейс", "price": 500.00, "category": "логистика" },
  { "name": "Сверление под подрозетник", "unit": "шт", "price": 40.00, "category": "работа" },
  { "name": "Установка светильника в потолок", "unit": "шт", "price": 200.00, "category": "работа" },
  { "name": "Прокладка силового кабеля", "unit": "м", "price": 95.00, "category": "работа" },
  { "name": "Разводка силовых линий по квартире", "unit": "м²", "price": 160.00, "category": "работа" }
];

(async () => {
  for (const item of prices) {
    try {
      const res = await axios.post('http://localhost:5000/api/prices', item, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(`✅ Добавлено: ${item.name}`);
    } catch (err) {
      console.error(`❌ Ошибка при добавлении "${item.name}":`, err.response?.data || err.message);
    }
  }
})();
