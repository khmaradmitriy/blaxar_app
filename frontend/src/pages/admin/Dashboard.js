import React from 'react';
import Container from 'react-bootstrap/Container';
import UserList from '../../components/UserList';

const AdminDashboard = () => {
  return (
    <Container className="py-4">
      <UserList />
    </Container>
  );
};

export default AdminDashboard;

