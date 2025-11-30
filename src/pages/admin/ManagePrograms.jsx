import React, { useState, useEffect } from 'react'
import * as api from '../../services/api'
import Modal from '../../components/Modal'
import Toast from '../../components/Toast'
import '../../styles/AdminManagePrograms.css'

export const AdminManageProgramsPage = () => {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    schedule: '',
    mode: 'online',
    status: 'open',
  })
  const [editingId, setEditingId] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  useEffect(() => {
    loadPrograms()
  }, [])

  const loadPrograms = async () => {
    try {
      setLoading(true)
      const data = await api.getJson('/api/programs')
      setPrograms(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load programs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.name.trim() || !formData.category.trim() || !formData.schedule.trim()) {
      setToastMessage('All fields are required')
      setToastType('error')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      if (editingId) {
        await api.putJson(`/api/programs/${editingId}`, formData)
        setToastMessage('Program updated successfully')
      } else {
        await api.postJson('/api/programs', formData)
        setToastMessage('Program created successfully')
      }
      setFormData({ name: '', category: '', schedule: '', mode: 'online', status: 'open' })
      setEditingId(null)
      setShowModal(false)
      setToastType('success')
      loadPrograms()
    } catch (error) {
      setToastMessage(error.message || 'Operation failed')
      setToastType('error')
    }
  }

  const handleEdit = (program) => {
    setFormData({
      name: program.name,
      category: program.category,
      schedule: program.schedule,
      mode: program.mode,
      status: program.status,
    })
    setEditingId(program.id)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return
    try {
      await api.deleteJson(`/api/programs/${id}`)
      setToastMessage('Program deleted successfully')
      setToastType('success')
      loadPrograms()
    } catch (error) {
      setToastMessage(error.message || 'Delete failed')
      setToastType('error')
    }
  }

  const handleOpenModal = () => {
    setFormData({ name: '', category: '', schedule: '', mode: 'online', status: 'open' })
    setEditingId(null)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setFormData({ name: '', category: '', schedule: '', mode: 'online', status: 'open' })
    setEditingId(null)
  }

  if (loading) {
    return <div className="page-container"><p>Loading programs...</p></div>
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Manage Programs</h1>
        <button onClick={handleOpenModal} className="btn-primary">
          + Add Program
        </button>
      </div>

      <div className="programs-table-container">
        {programs.length > 0 ? (
          <table className="programs-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Schedule</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr key={program.id}>
                  <td>{program.name}</td>
                  <td>{program.category}</td>
                  <td>{program.schedule}</td>
                  <td>{program.mode}</td>
                  <td>{program.status}</td>
                  <td className="actions">
                    <button onClick={() => handleEdit(program)} className="btn-edit">
                      ✏️
                    </button>
                    <button onClick={() => handleDelete(program.id)} className="btn-delete">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-items">No programs found.</p>
        )}
      </div>

      {showModal && (
        <Modal title={editingId ? 'Edit Program' : 'Add Program'} onClose={handleCloseModal}>
          <form onSubmit={handleSubmit} className="program-form">
            <div className="form-group">
              <label htmlFor="name">Program Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Program name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="E.g., Mental Wellness"
              />
            </div>

            <div className="form-group">
              <label htmlFor="schedule">Schedule</label>
              <input
                id="schedule"
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                placeholder="E.g., Mon, Wed, Fri 10:00 AM"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mode">Mode</label>
                <select id="mode" name="mode" value={formData.mode} onChange={handleChange}>
                  <option value="online">Online</option>
                  <option value="in-person">In-Person</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={formData.status} onChange={handleChange}>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-primary">
                {editingId ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={handleCloseModal} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {toastMessage && <Toast message={toastMessage} type={toastType} />}
    </div>
  )
}
