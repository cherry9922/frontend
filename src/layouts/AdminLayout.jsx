import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Nav from '../components/Nav'
import '../styles/AdminLayout.css'

export const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Nav />
      <div className="layout-container">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h3>Admin Portal</h3>
          </div>
          <nav className="sidebar-nav">
            <Link to="/admin" className="nav-link">
              📊 Dashboard
            </Link>
            <Link to="/admin/resources" className="nav-link">
              📚 Manage Resources
            </Link>
            <Link to="/admin/programs" className="nav-link">
              🏃 Manage Programs
            </Link>
            <Link to="/admin/metrics" className="nav-link">
              📈 Metrics
            </Link>
          </nav>
        </aside>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
