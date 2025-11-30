import React from 'react'
import { useAuth } from '../../context/AuthContext'
import '../../styles/StudentDashboard.css'

export const StudentDashboardPage = () => {
  const { user } = useAuth()

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Welcome, {user?.name}!</h1>
        <p>Your Student Health & Wellness Dashboard</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>Active Programs</h3>
            <p className="stat-number">3</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>Resources Viewed</h3>
            <p className="stat-number">12</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Support Requests</h3>
            <p className="stat-number">2</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3>Streak Days</h3>
            <p className="stat-number">7</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Quick Links</h2>
        <div className="quick-links">
          <a href="/student/resources" className="quick-link-btn">
            Explore Resources
          </a>
          <a href="/student/programs" className="quick-link-btn">
            Browse Programs
          </a>
          <a href="/student/support" className="quick-link-btn">
            Get Support
          </a>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Wellness Tips</h2>
        <div className="tips-container">
          <div className="tip-card">
            <h4>💤 Sleep Well</h4>
            <p>Aim for 7-9 hours of quality sleep every night for better focus and health.</p>
          </div>
          <div className="tip-card">
            <h4>🧘 Practice Mindfulness</h4>
            <p>Take 5 minutes daily to practice breathing exercises or meditation.</p>
          </div>
          <div className="tip-card">
            <h4>🍎 Eat Healthy</h4>
            <p>Balance your meals with fruits, vegetables, proteins, and whole grains.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
