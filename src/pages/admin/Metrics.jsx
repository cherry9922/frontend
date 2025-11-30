import React, { useState, useEffect } from 'react'
import * as api from '../../services/api'
import '../../styles/AdminMetrics.css'

export const AdminMetricsPage = () => {
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
    return <div className="page-container"><p>Loading metrics...</p></div>
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Platform Metrics & Analytics</h1>
        <p>Detailed usage statistics and trends</p>
      </div>

      {metrics && (
        <>
          <div className="metrics-summary">
            <div className="summary-card">
              <h3>Total Platform Stats</h3>
              <div className="stats-list">
                <div className="stat-row">
                  <span>Resources:</span>
                  <strong>{metrics.totalResources}</strong>
                </div>
                <div className="stat-row">
                  <span>Programs:</span>
                  <strong>{metrics.totalPrograms}</strong>
                </div>
                <div className="stat-row">
                  <span>Support Requests:</span>
                  <strong>{metrics.totalSupportRequests}</strong>
                </div>
                <div className="stat-row">
                  <span>Active Students:</span>
                  <strong>{metrics.activeStudents}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metrics-section">
              <h2>Weekly Login Activity</h2>
              <div className="detailed-chart">
                <div className="chart-header">
                  <span>Day</span>
                  <span>Logins</span>
                </div>
                {metrics.loginsThisWeek.map((count, idx) => {
                  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                  const maxCount = Math.max(...metrics.loginsThisWeek)

                  return (
                    <div key={idx} className="chart-row">
                      <span className="day-label">{days[idx]}</span>
                      <div className="chart-bar-container">
                        <div
                          className="chart-bar"
                          style={{ width: `${(count / maxCount) * 100}%` }}
                        ></div>
                        <span className="bar-label">{count}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="metrics-section">
              <h2>Program Enrollment Leaders</h2>
              <div className="programs-detailed">
                {metrics.topPrograms.map((prog, idx) => (
                  <div key={idx} className="program-stat">
                    <div className="program-rank">
                      <span className="rank-number">{idx + 1}</span>
                    </div>
                    <div className="program-details">
                      <h4>{prog.name}</h4>
                      <div className="enrollment-bar">
                        <div
                          className="enrollment-progress"
                          style={{
                            width: `${(prog.enrollments / Math.max(...metrics.topPrograms.map((p) => p.enrollments))) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <p className="enrollment-count">{prog.enrollments} students enrolled</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="insights-section">
            <h2>Key Insights</h2>
            <div className="insights-grid">
              <div className="insight-card">
                <h4>Most Active Day</h4>
                <p className="insight-value">
                  {(() => {
                    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    const maxIdx = metrics.loginsThisWeek.indexOf(Math.max(...metrics.loginsThisWeek))
                    return days[maxIdx]
                  })()}
                </p>
              </div>
              <div className="insight-card">
                <h4>Avg Daily Logins</h4>
                <p className="insight-value">
                  {Math.round(metrics.loginsThisWeek.reduce((a, b) => a + b, 0) / metrics.loginsThisWeek.length)}
                </p>
              </div>
              <div className="insight-card">
                <h4>Most Popular Program</h4>
                <p className="insight-value">{metrics.topPrograms[0]?.name.split(' ')[0]}</p>
              </div>
              <div className="insight-card">
                <h4>Avg Enrollment Rate</h4>
                <p className="insight-value">
                  {Math.round(
                    (metrics.topPrograms.reduce((a, b) => a + b.enrollments, 0) / (metrics.topPrograms.length * 30)) * 100
                  )}
                  %
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
