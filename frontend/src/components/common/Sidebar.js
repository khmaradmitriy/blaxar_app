import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaUsers, FaProjectDiagram, FaFileInvoiceDollar, FaTags } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // стили ниже

const Sidebar = ({ isOpen }) => {
  const menu = [
    { to: '/admin/users', icon: <FaUsers />, label: 'Люди' },
    { to: '/admin/objects', icon: <FaProjectDiagram />, label: 'Объекты' },
    { to: '/admin/estimates', icon: <FaFileInvoiceDollar />, label: 'Сметы' },
    { to: '/admin/prices', icon: <FaTags />, label: 'Прайс' },
  ];

  return (
    <div className={`sidebar bg-white border-end ${isOpen ? 'open' : ''}`}>
      <Nav className="flex-column pt-4">
        {menu.map(({ to, icon, label }) => (
          <Nav.Item key={to} className="px-3 py-2">
            <Link to={to} className="text-decoration-none d-flex align-items-center text-dark">
              {icon}
              <span className="ms-2">{label}</span>
            </Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
