const taskModel = require('../models/taskModel');

// 🔹 Получить активные задачи для монтажника
exports.getActiveByWorker = async (req, res) => {
  try {
    const tasks = await taskModel.getActiveTasksByWorker(req.user.id);
    res.json(tasks);
  } catch (err) {
    console.error('Ошибка при получении активных задач:', err);
    res.status(500).json({ message: 'Ошибка при получении активных задач' });
  }
};

// 🔹 Получить все задачи текущего монтажника
exports.getAllByWorker = async (req, res) => {
  try {
    const tasks = await taskModel.getAllByWorker(req.user.id);
    res.json(tasks);
  } catch (err) {
    console.error('Ошибка при получении задач:', err);
    res.status(500).json({ message: 'Ошибка при получении задач' });
  }
};

// 🔹 Монтажник берет задачу
exports.takeTask = async (req, res) => {
  try {
    const active = await taskModel.getActiveTasksByWorker(req.user.id);
    if (active.length >= 3) {
      return res.status(400).json({ message: 'У вас уже 3 активные задачи' });
    }

    const available = await taskModel.getAvailableTasks();
    if (!available.length) {
      return res.status(404).json({ message: 'Нет доступных задач' });
    }

    const task = available[0];
    await taskModel.assignTask(task.id, req.user.id, true);
    res.json({ message: 'Задача назначена', task });
  } catch (err) {
    console.error('Ошибка при получении задания:', err);
    res.status(500).json({ message: 'Ошибка при получении задания' });
  }
};

// 🔹 Монтажник отказывается от задачи
exports.refuseTask = async (req, res) => {
  const { taskId } = req.body;

  try {
    const task = await taskModel.getById(taskId);
    if (!task || task.worker_id !== req.user.id) {
      return res.status(403).json({ message: 'Нет доступа к задаче' });
    }

    await taskModel.refuseTask(taskId);
    res.json({ message: 'Задача возвращена в пул' });
  } catch (err) {
    console.error('Ошибка при отказе от задачи:', err);
    res.status(500).json({ message: 'Ошибка при отказе' });
  }
};

// 🔹 Назначить задачу от имени прораба или админа
exports.assignByForeman = async (req, res) => {
  const { taskId, workerId } = req.body;

  if (!taskId || !workerId) {
    return res.status(400).json({ message: 'Необходимы taskId и workerId' });
  }

  try {
    await taskModel.assignTask(taskId, workerId, false);
    res.json({ message: 'Задача назначена' });
  } catch (err) {
    console.error('Ошибка при назначении задачи:', err);
    res.status(500).json({ message: 'Ошибка назначения задачи' });
  }
};

// 🔹 Обновить статус задачи
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ['created', 'in_progress', 'on_review', 'approved', 'revision', 'paid'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Недопустимый статус' });
  }

  try {
    await taskModel.updateStatus(id, status);
    res.json({ message: 'Статус обновлён' });
  } catch (err) {
    console.error('Ошибка при обновлении статуса задачи:', err);
    res.status(500).json({ message: 'Ошибка обновления' });
  }
};
