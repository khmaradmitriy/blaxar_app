// src/layouts/AdminLayout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import AdminNavbar from '../components/navbars/AdminNavbar';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="d-flex">
      <Sidebar isOpen={isSidebarOpen} role="admin" />
      <div className="flex-grow-1">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <main className="p-4 mt-5 bg-light" style={{ minHeight: '100vh' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

