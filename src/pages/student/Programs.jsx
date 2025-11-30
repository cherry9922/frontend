import React, { useState, useEffect } from 'react'
import * as api from '../../services/api'
import '../../styles/StudentPrograms.css'

export const StudentProgramsPage = () => {
  const [programs, setPrograms] = useState([])
  const [enrolledPrograms, setEnrolledPrograms] = useState(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPrograms()
    const stored = localStorage.getItem('enrolledPrograms')
    if (stored) {
      setEnrolledPrograms(new Set(JSON.parse(stored)))
    }
  }, [])

  const loadPrograms = async () => {
    try {
      setLoading(true)
      const data = await api.getJson('/api/programs')
      if (Array.isArray(data)) {
        // normalize id for backend (_id) or mock (id)
        const normalized = data.map((p) => ({ ...(p || {}), id: p.id || p._id }))
        setPrograms(normalized)
      } else {
        setPrograms([])
      }
    } catch (error) {
      console.error('Failed to load programs:', error)
      setPrograms([])
    } finally {
      setLoading(false)
    }
  }

  const toggleEnroll = (programId) => {
    const updated = new Set(enrolledPrograms)
    if (updated.has(programId)) {
      updated.delete(programId)
    } else {
      updated.add(programId)
    }
    setEnrolledPrograms(updated)
    localStorage.setItem('enrolledPrograms', JSON.stringify(Array.from(updated)))
  }

  if (loading) {
    return <div className="page-container"><p>Loading programs...</p></div>
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Wellness Programs</h1>
        <p>Enroll in programs that match your wellness goals</p>
      </div>

      <div className="programs-grid">
        {programs.length > 0 ? (
          programs.map((program) => {
            const isEnrolled = enrolledPrograms.has(program.id)
            const isFull = program.enrolled >= program.capacity
            const enrollmentPercentage = (program.enrolled / program.capacity) * 100

            return (
              <div key={program.id} className="program-card">
                <div className="program-header">
                  <h3>{program.name}</h3>
                  <span className="mode-badge">{program.mode}</span>
                </div>

                <div className="program-details">
                  <p>
                    <strong>Category:</strong> {program.category}
                  </p>
                  <p>
                    <strong>Schedule:</strong> {program.schedule}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    {program.status === 'open' ? (
                      <span className="status-open">Open</span>
                    ) : (
                      <span className="status-closed">Closed</span>
                    )}
                  </p>
                </div>

                <div className="enrollment-info">
                  <p>
                    Enrolled: {program.enrolled} / {program.capacity}
                  </p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${enrollmentPercentage}%` }}></div>
                  </div>
                </div>

                <button
                  className={`enroll-btn ${isEnrolled ? 'enrolled' : ''} ${isFull && !isEnrolled ? 'disabled' : ''}`}
                  onClick={() => toggleEnroll(program.id)}
                  disabled={isFull && !isEnrolled}
                >
                  {isEnrolled ? '✓ Enrolled' : isFull ? 'Program Full' : 'Enroll Now'}
                </button>
              </div>
            )
          })
        ) : (
          <p className="no-items">No programs available.</p>
        )}
      </div>
    </div>
  )
}
