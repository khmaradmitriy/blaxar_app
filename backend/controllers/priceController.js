const {
  getAllPrices,
  getPriceById,
  createPrice,
  updatePrice,
  deletePrice
} = require('../models/priceModel');
const logHistory = require('../utils/logHistory');

exports.getAll = async (req, res) => {
  try {
    const prices = await getAllPrices();
    res.json(prices);
  } catch (err) {
    console.error('Ошибка получения прайса:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getById = async (req, res) => {
  try {
    const price = await getPriceById(req.params.id);
    if (!price) return res.status(404).json({ message: 'Позиция не найдена' });
    res.json(price);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения' });
  }
};

exports.create = async (req, res) => {
  const { name, unit, price, category } = req.body;
  if (!name || !unit || !price || !category) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  try {
    const id = await createPrice({ name, unit, price, category });
    await logHistory('price', id, 'Создание позиции', req.user.id);
    res.status(201).json({ id });
  } catch (err) {
    console.error('Ошибка создания позиции:', err);
    res.status(500).json({ message: 'Ошибка создания' });
  }
};

exports.update = async (req, res) => {
  const { name, unit, price, category } = req.body;
  try {
    await updatePrice(req.params.id, { name, unit, price, category });
    await logHistory('price', req.params.id, 'Обновление позиции', req.user.id);
    res.json({ message: 'Позиция обновлена' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка обновления' });
  }
};

exports.remove = async (req, res) => {
  try {
    await deletePrice(req.params.id);
    await logHistory('price', req.params.id, 'Удаление позиции', req.user.id);
    res.json({ message: 'Позиция удалена' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка удаления' });
  }
};
