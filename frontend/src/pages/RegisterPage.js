import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    surname: '',
    name: '',
    patronymic: '',
    birth_date: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      form.email &&
      form.password &&
      form.confirmPassword &&
      form.password.length >= 6 &&
      form.password === form.confirmPassword &&
      form.surname &&
      form.name &&
      form.birth_date
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      await api.post('/auth/register', {
        ...form,
        role: 'worker'
      });
      setSuccess('Регистрация прошла успешно!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка регистрации');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: '100%', maxWidth: '420px' }} className="p-4 shadow-sm border-0">
        <Card.Body>
          <h3 className="mb-4 text-center">Регистрация</h3>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={form.surname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Отчество</Form.Label>
              <Form.Control
                type="text"
                name="patronymic"
                value={form.patronymic}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Дата рождения</Form.Label>
              <Form.Control
                type="date"
                name="birth_date"
                value={form.birth_date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Пароль</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="rounded-start-3"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  className="rounded-end-3"
                >
                  {showPassword ? '👁️' : '🙈'}
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Повтор пароля</Form.Label>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 fw-bold rounded-3"
              disabled={!isFormValid()}
            >
              Зарегистрироваться
            </Button>
          </Form>

          <div className="text-center mt-3">
            <small>
              Уже есть аккаунт? <Link to="/login">Войти</Link>
            </small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RegisterPage;
