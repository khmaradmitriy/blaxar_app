import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [loading, setLoading] = useState(true); // <-- важно
const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });

  const { accessToken, refreshToken, user } = res.data;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  setUser(user);
  setAccessToken(accessToken);

  return user; // ✅ Добавьте эту строку
};



  const logout = async () => {
    const token = localStorage.getItem('refreshToken');
    if (token) {
      await api.post('/auth/logout', { token }).catch(() => {});
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setAccessToken('');
  };

  const refresh = async () => {
    try {
      const token = localStorage.getItem('refreshToken');
      if (!token) throw new Error('Нет refreshToken');

      const res = await api.post('/auth/refresh', { token });
      localStorage.setItem('accessToken', res.data.accessToken);
      setAccessToken(res.data.accessToken);
    } catch (err) {
      await logout();
    }
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return setLoading(false);

    try {
      const res = await api.get('/auth/me'); // ❗️Убедись, что такой маршрут есть
      setUser(res.data);
    } catch (err) {
      await refresh();
      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
      } catch {
        await logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
