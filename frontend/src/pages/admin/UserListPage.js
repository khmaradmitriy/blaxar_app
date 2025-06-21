import React, { useEffect, useState } from 'react';
import api from '../../api';
import UserTable from '../../components/admin/UserTable';
import { Container } from 'react-bootstrap';

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get('/users');
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Пользователи</h2>
      <UserTable users={users} />
    </Container>
  );
};

export default UserListPage;
