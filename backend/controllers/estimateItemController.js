const model = require('../models/estimateItemModel');
const logHistory = require('../utils/logHistory');

// 🔹 Создать позицию
exports.create = async (req, res) => {
  try {
    const { estimate_id, name, unit, price, quantity, category } = req.body;
    if (!estimate_id || !name || !unit || !price || !category) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }

    const id = await model.createItem({ estimate_id, name, unit, price, quantity, category });
    await logHistory('estimate_item', id, 'Создание позиции', req.user.id);

    res.status(201).json({ id });
  } catch (err) {
    console.error('Ошибка создания позиции:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// 🔹 Получить все позиции по смете
exports.getByEstimate = async (req, res) => {
  try {
    const estimateId = req.params.estimateId;
    const items = await model.getItemsByEstimate(estimateId);
    res.json(items);
  } catch (err) {
    console.error('Ошибка получения позиций:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// 🔹 Обновить позицию
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, unit, price, quantity, category } = req.body;

    await model.updateItem({ id, name, unit, price, quantity, category });
    await logHistory('estimate_item', id, 'Обновление позиции', req.user.id);

    res.json({ message: 'Позиция обновлена' });
  } catch (err) {
    console.error('Ошибка обновления позиции:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// 🔹 Удалить позицию
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await model.deleteItem(id);
    await logHistory('estimate_item', id, 'Удаление позиции', req.user.id);
    res.json({ message: 'Позиция удалена' });
  } catch (err) {
    console.error('Ошибка удаления позиции:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
