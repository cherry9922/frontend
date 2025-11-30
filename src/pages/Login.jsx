import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Auth.css'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const isValid = email && password && password.length >= 6 && /@/.test(email)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!isValid) {
      setError('Please provide a valid email and password (6+ characters)')
      return
    }

    try {
      await login(email, password)
      navigate('/student')
    } catch (err) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Student Wellness</h1>
            <p>Health & Wellness Platform</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <h2>Login</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="auth-button"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <div className="auth-footer">
              <p>
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </div>
          </form>

          <div className="demo-credentials">
            <h4>Demo Credentials:</h4>
            <p><strong>Admin:</strong> admin@example.com / adminpass</p>
            <p><strong>Student:</strong> student@example.com / studentpass</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Keep backward compatibility export
export default LoginPage
