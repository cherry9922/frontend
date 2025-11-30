import React, { useEffect, useState } from 'react'
import * as api from '../services/api'

export default function ResourceList(){
  const [resources, setResources] = useState([])
  useEffect(()=>{
    let mounted = true
    api.getJson('/api/resources')
      .then((data)=>{
        if(!mounted) return
        if(Array.isArray(data)){
          // normalize id field for backend (_id) or mock (id)
          const normalized = data.map(r => ({ ...(r || {}), id: r.id || r._id, createdAt: r.createdAt || new Date().toISOString() }))
          setResources(normalized)
        } else setResources([])
      }).catch(()=>{ if(mounted) setResources([]) });
    return ()=>{ mounted = false }
  },[])
  return (
    <div className="grid">
      {resources.map(r=> (
        <div className="card" key={r.id}>
          <h4>{r.title}</h4>
          <p>{r.description}</p>
          {r.link && <a href={r.link} target="_blank" rel="noreferrer">Open</a>}
          <small>{r.category}</small>
        </div>
      ))}
    </div>
  )
}
