import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserModal = ({ show, onHide, user }) => {
  if (!user) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Информация о пользователе</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Фамилия:</strong> {user.surname}</p>
        <p><strong>Имя:</strong> {user.name}</p>
        <p><strong>Отчество:</strong> {user.patronymic}</p>
        <p><strong>Роль:</strong> {user.role}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Дата рождения:</strong> {user.birth_date}</p>
        <p><strong>Дата создания:</strong> {user.created_at}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
