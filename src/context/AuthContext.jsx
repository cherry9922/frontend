import React, { createContext, useState, useCallback, useEffect } from 'react'
import * as api from '../services/api'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('sw_token')
    const storedUser = localStorage.getItem('sw_user')
    
    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Failed to parse stored user:', e)
        localStorage.removeItem('sw_token')
        localStorage.removeItem('sw_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await api.postJson('/auth/login', { email, password })
      if (response.user) {
        setUser(response.user)
        localStorage.setItem('sw_token', response.token)
        localStorage.setItem('sw_user', JSON.stringify(response.user))
        return response.user
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (err) {
      const message = err.message || 'Login failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (name, email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await api.postJson('/auth/register', { name, email, password })
      if (response.user) {
        setUser(response.user)
        localStorage.setItem('sw_token', response.token)
        localStorage.setItem('sw_user', JSON.stringify(response.user))
        return response.user
      } else {
        throw new Error(response.message || 'Registration failed')
      }
    } catch (err) {
      const message = err.message || 'Registration failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('sw_token')
    localStorage.removeItem('sw_user')
  }, [])

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
