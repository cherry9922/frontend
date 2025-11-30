import React, { useState, useEffect } from 'react'
import * as api from '../../services/api'
import '../../styles/StudentResources.css'

export const StudentResourcesPage = () => {
  const [resources, setResources] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedId, setExpandedId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadResources()
  }, [])

  const loadResources = async () => {
    try {
      setLoading(true)
      const data = await api.getJson('/api/resources')
      if (Array.isArray(data)) {
        // normalize id and createdAt for backend (_id) or mock (id)
        const normalized = data.map((r) => ({ ...(r || {}), id: r.id || r._id, createdAt: r.createdAt || new Date().toISOString() }))
        setResources(normalized)
      } else {
        setResources([])
      }
    } catch (error) {
      console.error('Failed to load resources:', error)
      setResources([])
    } finally {
      setLoading(false)
    }
  }

  const categories = ['All', ...new Set(resources.map((r) => r.category))]
  const filtered =
    selectedCategory === 'All' ? resources : resources.filter((r) => r.category === selectedCategory)

  if (loading) {
    return <div className="page-container"><p>Loading resources...</p></div>
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Health & Wellness Resources</h1>
        <p>Access curated articles and guides for your wellbeing</p>
      </div>

      <div className="filter-section">
        <label>Filter by Category:</label>
        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="resources-list">
        {filtered.length > 0 ? (
          filtered.map((resource) => (
            <div key={resource.id} className="resource-card">
              <div
                className="resource-header"
                onClick={() => setExpandedId(expandedId === resource.id ? null : resource.id)}
              >
                <div>
                  <h3>{resource.title}</h3>
                  <span className="category-badge">{resource.category}</span>
                </div>
                <button className="expand-btn">{expandedId === resource.id ? '−' : '+'}</button>
              </div>
              {expandedId === resource.id && (
                <div className="resource-content">
                  <p>{resource.description}</p>
                  <div className="resource-footer">
                    <small>
                      Published: {new Date(resource.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-items">No resources found in this category.</p>
        )}
      </div>
    </div>
  )
}
