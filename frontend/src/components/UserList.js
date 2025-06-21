import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import api from '../api';
import UserModal from './UserModal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get('/users');
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleView = (user) => {
    setSelected(user);
    setModalShow(true);
  };

  return (
    <>
      <h4 className="mb-4">Пользователи</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Роль</th>
            <th>Дата рождения</th>
            <th>Email</th>
            <th>Дата создания</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.surname}</td>
              <td>{user.name}</td>
              <td>{user.patronymic}</td>
              <td>{user.role}</td>
              <td>{user.birth_date}</td>
              <td>{user.email}</td>
              <td>{user.created_at}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleView(user)}
                  title="Подробнее"
                >
                  <FaEye />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <UserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={selected}
      />
    </>
  );
};

export default UserList;
