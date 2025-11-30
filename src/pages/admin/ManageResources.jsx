import React, { useState, useEffect } from 'react'
import * as api from '../../services/api'
import Modal from '../../components/Modal'
import Toast from '../../components/Toast'
import '../../styles/AdminManageResources.css'

export const AdminManageResourcesPage = () => {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ title: '', category: '', description: '' })
  const [editingId, setEditingId] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  useEffect(() => {
    loadResources()
  }, [])

  const loadResources = async () => {
    try {
      setLoading(true)
      const data = await api.getJson('/api/resources')
      setResources(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.title.trim() || !formData.category.trim() || !formData.description.trim()) {
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
        await api.putJson(`/api/resources/${editingId}`, formData)
        setToastMessage('Resource updated successfully')
      } else {
        await api.postJson('/api/resources', formData)
        setToastMessage('Resource created successfully')
      }
      setFormData({ title: '', category: '', description: '' })
      setEditingId(null)
      setShowModal(false)
      setToastType('success')
      loadResources()
    } catch (error) {
      setToastMessage(error.message || 'Operation failed')
      setToastType('error')
    }
  }

  const handleEdit = (resource) => {
    setFormData({ title: resource.title, category: resource.category, description: resource.description })
    setEditingId(resource.id)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return
    try {
      await api.deleteJson(`/api/resources/${id}`)
      setToastMessage('Resource deleted successfully')
      setToastType('success')
      loadResources()
    } catch (error) {
      setToastMessage(error.message || 'Delete failed')
      setToastType('error')
    }
  }

  const handleOpenModal = () => {
    setFormData({ title: '', category: '', description: '' })
    setEditingId(null)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setFormData({ title: '', category: '', description: '' })
    setEditingId(null)
  }

  if (loading) {
    return <div className="page-container"><p>Loading resources...</p></div>
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Manage Resources</h1>
        <button onClick={handleOpenModal} className="btn-primary">
          + Add Resource
        </button>
      </div>

      <div className="resources-table-container">
        {resources.length > 0 ? (
          <table className="resources-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <tr key={resource.id}>
                  <td>{resource.title}</td>
                  <td>{resource.category}</td>
                  <td>{resource.description.substring(0, 50)}...</td>
                  <td className="actions">
                    <button onClick={() => handleEdit(resource)} className="btn-edit">
                      ✏️
                    </button>
                    <button onClick={() => handleDelete(resource.id)} className="btn-delete">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-items">No resources found.</p>
        )}
      </div>

      {showModal && (
        <Modal title={editingId ? 'Edit Resource' : 'Add Resource'} onClose={handleCloseModal}>
          <form onSubmit={handleSubmit} className="resource-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Resource title"
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
                placeholder="E.g., Mental Health"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Resource description"
                rows="4"
              ></textarea>
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
