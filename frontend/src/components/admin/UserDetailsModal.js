import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

const UserDetailsModal = ({ user, onHide }) => {
  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Информация о пользователе</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>ФИО:</strong> {`${user.surname} ${user.name} ${user.patronymic}`}</ListGroup.Item>
          <ListGroup.Item><strong>Email:</strong> {user.email}</ListGroup.Item>
          <ListGroup.Item><strong>Роль:</strong> {user.role}</ListGroup.Item>
          <ListGroup.Item><strong>Дата рождения:</strong> {user.birth_date}</ListGroup.Item>
          <ListGroup.Item><strong>Создан:</strong> {new Date(user.created_at).toLocaleDateString()}</ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailsModal;
