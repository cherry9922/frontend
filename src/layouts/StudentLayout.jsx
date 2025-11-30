import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Nav from '../components/Nav'
import '../styles/StudentLayout.css'

export const StudentLayout = () => {
  const { user } = useAuth()

  return (
    <div className="student-layout">
      <Nav />
      <div className="layout-container">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h3>Student Portal</h3>
          </div>
          <nav className="sidebar-nav">
            <Link to="/student" className="nav-link">
              📊 Dashboard
            </Link>
            <Link to="/student/resources" className="nav-link">
              📚 Resources
            </Link>
            <Link to="/student/programs" className="nav-link">
              🏃 Programs
            </Link>
            <Link to="/student/support" className="nav-link">
              🤝 Support Request
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
