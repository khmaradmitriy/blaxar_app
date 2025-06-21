require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const objectRoutes = require('./routes/objectRoutes');
const estimateRoutes = require('./routes/estimateRoutes');
const estimateItemRoutes = require('./routes/estimateItemRoutes');
const priceRoutes = require('./routes/priceRoutes');
const taskRoutes = require('./routes/taskRoutes');
//const notificationRoutes = require('./routes/notificationRoutes');
//const fileRoutes = require('./routes/fileRoutes');
//const historyRoutes = require('./routes/historyRoutes');

const errorMiddleware = require('./middlewares/errorMiddleware');
const pool = require('./config/db');
const initDB = require('./config/initDB');

app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  credentials: true               // разрешает cookie + заголовки
}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({}));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/objects', objectRoutes);
app.use('/api/estimates', estimateRoutes);
app.use('/api/estimate-items', estimateItemRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/tasks', taskRoutes);
//app.use('/api/notifications', notificationRoutes);
//app.use('/api/files', fileRoutes);
//app.use('/api/history', historyRoutes);
app.use(errorMiddleware);

const startServer = async () => {
  try {
    const conn = await pool.getConnection();
    const [time] = await conn.query('SELECT NOW() AS now');
    conn.release();

    await initDB();

    console.log('✅ Успешное подключение к базе данных:');
    console.log(`   Хост: ${process.env.DB_HOST}`);
    console.log(`   Порт: ${process.env.DB_PORT}`);
    console.log(`   БД:   ${process.env.DB_NAME}`);
    console.log(`   Время сервера БД: ${new Date(time[0].now).toString()}`);

    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на порту ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Ошибка подключения к базе данных:', err.message);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer(); // не вызывается при jest
}

module.exports = app;
