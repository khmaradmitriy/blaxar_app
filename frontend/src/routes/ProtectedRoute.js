import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { user, accessToken } = useContext(AuthContext);
  const location = useLocation();

  // 🔄 Ожидание загрузки user, если accessToken уже есть
  if (accessToken && user === null) {
    return <div>Загрузка...</div>;
  }

  // ⛔ Неавторизован — отправляем на логин
  if (!accessToken || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ❌ Неподходящая роль — делаем редирект по роли
  if (roles && !roles.includes(user.role)) {
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'foreman') return <Navigate to="/foreman" replace />;
    if (user.role === 'worker') return <Navigate to="/worker" replace />;
    return <Navigate to="/login" replace />;
  }

  // ✅ Всё ок — рендерим содержимое
  return children;
};

export default ProtectedRoute;
