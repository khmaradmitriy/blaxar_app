import React from 'react';
import { Navbar, Container, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const AdminNavbar = ({ toggleSidebar }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Navbar bg="white" variant="light" className="shadow-sm px-3" fixed="top">
      <Container fluid className="d-flex justify-content-between">
        <Button variant="link" className="text-dark" onClick={toggleSidebar}>
          <FaBars size={20} />
        </Button>

        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="logout-tooltip">Выйти</Tooltip>}
        >
          <Button variant="link" onClick={handleLogout} className="text-dark">
            <FaSignOutAlt size={20} />
          </Button>
        </OverlayTrigger>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;

