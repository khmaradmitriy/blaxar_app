const {
  createEstimate,
  getEstimatesByObject,
  getEstimateById,
  updateEstimate,
  deleteEstimate,
} = require('../models/estimateModel');
const logHistory = require('../utils/logHistory');

// 🔹 Создание сметы
exports.create = async (req, res) => {
  const { object_id, name } = req.body;

  if (!object_id || !name) {
    return res.status(400).json({ message: 'Необходимо указать объект и название сметы' });
  }

  try {
    const id = await createEstimate({ object_id, name, created_by: req.user.id });
    await logHistory('estimate', id, 'Создание сметы', req.user.id);
    res.status(201).json({ id });
  } catch (err) {
    console.error('Ошибка при создании сметы:', err);
    res.status(500).json({ message: 'Ошибка создания сметы' });
  }
};

// 🔹 Получение всех смет по объекту
exports.getByObject = async (req, res) => {
  const { objectId } = req.params;

  try {
    const estimates = await getEstimatesByObject(objectId);
    res.json(estimates);
  } catch (err) {
    console.error('Ошибка при получении смет:', err);
    res.status(500).json({ message: 'Ошибка получения смет' });
  }
};

// 🔹 Обновление сметы
exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;

  try {
    await updateEstimate({ id, name, status });
    await logHistory('estimate', id, 'Обновление сметы', req.user.id);
    res.json({ message: 'Смета обновлена' });
  } catch (err) {
    console.error('Ошибка при обновлении сметы:', err);
    res.status(500).json({ message: 'Ошибка обновления' });
  }
};

// 🔹 Удаление сметы
exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteEstimate(id);
    await logHistory('estimate', id, 'Удаление сметы', req.user.id);
    res.json({ message: 'Смета удалена' });
  } catch (err) {
    console.error('Ошибка при удалении сметы:', err);
    res.status(500).json({ message: 'Ошибка удаления' });
  }
};
