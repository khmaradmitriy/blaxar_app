import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Image } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import logo from '../assets/blixar-logo.png.png';

const LoginPage = () => {
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // 🔁 После логина — перенаправляем пользователя по роли
  useEffect(() => {
    if (!user) return;

    if (user.role === 'admin') navigate('/admin');
    else if (user.role === 'foreman') navigate('/foreman');
    else if (user.role === 'worker') navigate('/worker');
  }, [user, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(email, password); // user обновится в контексте
      setError('');
    } catch (err) {
      console.error('Ошибка логина:', err);
      setError('Неверный email или пароль');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <Card
        className="shadow-sm p-4 border-0"
        style={{ width: '100%', maxWidth: '400px', borderRadius: '12px' }}
      >
        <Card.Body className="text-center">
          <Image
            src={logo}
            alt="Blixar Logo"
            fluid
            style={{ maxWidth: '160px', marginBottom: '20px' }}
          />
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3 text-start">
              <Form.Label className="fw-semibold text-muted">Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4 text-start">
              <Form.Label className="fw-semibold text-muted">Пароль</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Введите пароль"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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

            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2 fw-bold rounded-3"
            >
              Войти
            </Button>

            <div className="mt-3 text-center">
              <small>
                Нет аккаунта? <a href="/register">Зарегистрироваться</a>
              </small>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;
