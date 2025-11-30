import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { StudentLayout } from './layouts/StudentLayout'
import { AdminLayout } from './layouts/AdminLayout'

// Auth Pages
import { LoginPage } from './pages/Login'
import { RegisterPage } from './pages/Register'
import { NotFoundPage } from './pages/NotFound'

// Student Pages
import { StudentDashboardPage } from './pages/student/StudentDashboard'
import { StudentResourcesPage } from './pages/student/Resources'
import { StudentProgramsPage } from './pages/student/Programs'
import { StudentSupportPage } from './pages/student/Support'

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboard'
import { AdminManageResourcesPage } from './pages/admin/ManageResources'
import { AdminManageProgramsPage } from './pages/admin/ManagePrograms'
import { AdminMetricsPage } from './pages/admin/Metrics'

export default function App() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/student'} /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/student'} /> : <RegisterPage />} />

      {/* Student Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboardPage />} />
        <Route path="resources" element={<StudentResourcesPage />} />
        <Route path="programs" element={<StudentProgramsPage />} />
        <Route path="support" element={<StudentSupportPage />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="resources" element={<AdminManageResourcesPage />} />
        <Route path="programs" element={<AdminManageProgramsPage />} />
        <Route path="metrics" element={<AdminMetricsPage />} />
      </Route>

      {/* Root & Fallback */}
      <Route path="/" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/student'} /> : <Navigate to="/login" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
