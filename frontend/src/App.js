import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import UserListPage from './pages/admin/UserListPage';
import WorkerDashboard from './pages/worker/Dashboard';

import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* Открытые страницы */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Админ с вложенными маршрутами */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserListPage />} />
        </Route>

        {/* Рабочий (worker) — на верхнем уровне! */}
<Route
  path="/worker"
  element={
    <ProtectedRoute roles={['worker']}>
      <WorkerDashboard />
    </ProtectedRoute>
  }
/>


        {/* Фоллбек: перенаправляем всё на /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </AuthProvider>
  );
}

export default App;
