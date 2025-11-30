import React, { useState, useEffect } from 'react'
import * as api from '../../services/api'
import '../../styles/AdminDashboard.css'

export const AdminDashboardPage = () => {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMetrics()
  }, [])

  const loadMetrics = async () => {
    try {
      setLoading(true)
      const data = await api.getJson('/api/metrics')
      setMetrics(data)
    } catch (error) {
      console.error('Failed to load metrics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="page-container"><p>Loading...</p></div>
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Overview of platform metrics and activity</p>
      </div>

      {metrics && (
        <>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">📚</div>
              <h3>Total Resources</h3>
              <p className="metric-value">{metrics.totalResources}</p>
            </div>

            <div className="metric-card">
              <div className="metric-icon">🏃</div>
              <h3>Total Programs</h3>
              <p className="metric-value">{metrics.totalPrograms}</p>
            </div>

            <div className="metric-card">
              <div className="metric-icon">🤝</div>
              <h3>Support Requests</h3>
              <p className="metric-value">{metrics.totalSupportRequests}</p>
            </div>

            <div className="metric-card">
              <div className="metric-icon">👥</div>
              <h3>Active Students</h3>
              <p className="metric-value">{metrics.activeStudents}</p>
            </div>
          </div>

          <div className="charts-section">
            <div className="chart-container">
              <h2>Logins This Week</h2>
              <div className="bar-chart">
                {metrics.loginsThisWeek.map((count, idx) => {
                  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  const maxCount = Math.max(...metrics.loginsThisWeek)
                  const height = (count / maxCount) * 100

                  return (
                    <div key={idx} className="bar-item">
                      <div className="bar" style={{ height: `${height}%` }}></div>
                      <label>{days[idx]}</label>
                      <span className="count">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="chart-container">
              <h2>Top Programs</h2>
              <div className="programs-list">
                {metrics.topPrograms.map((prog, idx) => (
                  <div key={idx} className="program-row">
                    <div className="program-info">
                      <h4>{prog.name}</h4>
                      <small>{prog.enrollments} enrollments</small>
                    </div>
                    <div className="program-bar">
                      <div
                        className="program-progress"
                        style={{
                          width: `${(prog.enrollments / Math.max(...metrics.topPrograms.map((p) => p.enrollments))) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
