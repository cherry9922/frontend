import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/login" className="back-link">
            ← Return to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

// Keep backward compatibility export
export default NotFoundPage
