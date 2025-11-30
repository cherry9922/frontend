import React, { useState } from 'react'
import Toast from '../../components/Toast'
import '../../styles/StudentSupport.css'

export const StudentSupportPage = () => {
  const [formData, setFormData] = useState({
    category: 'Mental Health',
    message: '',
    urgency: 'medium',
  })
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')
  const [supportRequests, setSupportRequests] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.message.trim()) {
      setToastMessage('Please enter a message')
      setToastType('error')
      return
    }

    const newRequest = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date(),
      status: 'open',
    }

    setSupportRequests((prev) => [newRequest, ...prev])
    setFormData({ category: 'Mental Health', message: '', urgency: 'medium' })
    setToastMessage('Support request submitted successfully!')
    setToastType('success')
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Submit Support Request</h1>
        <p>We're here to help. Share what's on your mind.</p>
      </div>

      <div className="support-content">
        <div className="support-form-section">
          <form onSubmit={handleSubmit} className="support-form">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Mental Health</option>
                <option>Academic Stress</option>
                <option>Physical Health</option>
                <option>Nutrition</option>
                <option>Sleep Issues</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="urgency">Urgency</label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please describe your situation..."
                rows="6"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Submit Request
            </button>
          </form>
        </div>

        <div className="support-requests-section">
          <h2>Your Support Requests</h2>
          {supportRequests.length > 0 ? (
            <div className="requests-list">
              {supportRequests.map((request) => (
                <div key={request.id} className="request-item">
                  <div className="request-header">
                    <div>
                      <h4>{request.category}</h4>
                      <small>{new Date(request.createdAt).toLocaleString()}</small>
                    </div>
                    <span
                      className={`urgency-badge urgency-${request.urgency}`}
                    >
                      {request.urgency.toUpperCase()}
                    </span>
                  </div>
                  <p className="request-message">{request.message}</p>
                  <div className="request-footer">
                    <span className={`status-badge status-${request.status}`}>
                      {request.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-items">No support requests yet.</p>
          )}
        </div>
      </div>

      {toastMessage && <Toast message={toastMessage} type={toastType} />}
    </div>
  )
}
