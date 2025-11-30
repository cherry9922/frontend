import React from 'react'

import { Link } from 'react-router-dom'

export default function Nav({ user, setUser }){
  const logout = () => {
    localStorage.removeItem('sw_token');
    localStorage.removeItem('sw_user');
    setUser(null);
  }
  return (
    <header className="nav">
      <div className="nav-left"><Link to="/">Student Wellness</Link></div>
      <div className="nav-right">
        <Link to="/">Home</Link>
        {user && user.role === 'admin' && <Link to="/admin" style={{marginLeft:8}}>Admin</Link>}
        {user && user.role === 'student' && <Link to="/student" style={{marginLeft:8}}>Dashboard</Link>}
        {user ? (
          <>
            <span style={{marginLeft:8}}>{user.name} ({user.role})</span>
            <button onClick={logout} style={{marginLeft:8}}>Logout</button>
          </>
        ) : (
          <span style={{marginLeft:8}}>Welcome</span>
        )}
      </div>
    </header>
  )
}
