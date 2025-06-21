const {
  getObjectsByUser,
  createObject,
  updateObject,
  getObjectById,
  attachForeman,
  detachForeman,
} = require('../models/objectModel');

const logHistory = require('../utils/logHistory');

// 🔹 Получить все объекты пользователя
exports.getAll = async (req, res) => {
  try {
    const objects = await getObjectsByUser(req.user);
    res.json(objects);
  } catch (err) {
    console.error('Ошибка при получении объектов:', err);
    res.status(500).json({ message: 'Ошибка получения объектов' });
  }
};

// 🔹 Создание объекта
exports.create = async (req, res) => {
  const { name, description } = req.body;

  try {
    const id = await createObject({
      name,
      description,
      created_by: req.user.id,
    });

    await attachForeman(req.user.id, id);
    await logHistory(req.user.id, id, 'Создание объекта');

    res.status(201).json({ id });
  } catch (err) {
    console.error('Ошибка при создании объекта:', err);
    res.status(500).json({ message: 'Ошибка создания объекта' });
  }
};

// 🔹 Обновление объекта
exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const object = await getObjectById(id);

    if (req.user.role === 'foreman' && object.created_by !== req.user.id) {
      return res.status(403).json({ message: 'Нет прав на редактирование объекта' });
    }

    await updateObject({ id, name, description });
    await logHistory(req.user.id, id, 'Редактирование объекта');

    res.json({ message: 'Объект обновлён' });
  } catch (err) {
    console.error('Ошибка при обновлении объекта:', err);
    res.status(500).json({ message: 'Ошибка обновления' });
  }
};

// 🔹 Назначение прораба
exports.assignForeman = async (req, res) => {
  const { userId, objectId } = req.body;

  try {
    await attachForeman(userId, objectId);
    await logHistory(req.user.id, objectId, `Назначен прораб user_id=${userId}`);
    res.json({ message: 'Прораб назначен' });
  } catch (err) {
    console.error('Ошибка при назначении прораба:', err);
    res.status(500).json({ message: 'Ошибка назначения' });
  }
};

// 🔹 Открепление прораба
exports.unassignForeman = async (req, res) => {
  const { userId, objectId } = req.body;

  try {
    await detachForeman(userId, objectId);
    await logHistory(req.user.id, objectId, `Откреплён прораб user_id=${userId}`);
    res.json({ message: 'Прораб откреплён' });
  } catch (err) {
    console.error('Ошибка при откреплении прораба:', err);
    res.status(500).json({ message: 'Ошибка открепления' });
  }
};
