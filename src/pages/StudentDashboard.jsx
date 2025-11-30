import React, { useEffect, useState } from 'react'
import ResourceList from '../components/ResourceList'
import * as api from '../services/api'

export default function StudentDashboard({ user }){
  const [programs, setPrograms] = useState([])

  useEffect(()=>{
    let mounted = true
    (async ()=>{
      try{
        const data = await api.getJson('/api/programs')
        if(mounted && Array.isArray(data)){
          const normalized = data.map(p => ({ ...(p||{}), id: p.id || p._id }))
          setPrograms(normalized)
        }
      }catch(e){ console.error('Failed loading dashboard programs', e) }
    })()
    return ()=> mounted = false
  },[])

  return (
    <div>
      <h2>Student Dashboard</h2>
      <section>
        <h3>Health Resources</h3>
        <ResourceList />
      </section>
      <section>
        <h3>Wellness Programs</h3>
        <div className="grid">
          {programs.map(p=> (
            <div className="card" key={p.id}>
              <h4>{p.name || p.title}</h4>
              <p>{p.description}</p>
              <small>Category: {p.category}</small>
              <form method="post" onSubmit={async (e)=>{e.preventDefault();
                try{
                  const token = localStorage.getItem('sw_token');
                  await api.postJson(`/api/programs/${p.id}/join`, {}, { headers: { Authorization: 'Bearer '+token } })
                  alert('Joined program');
                }catch(err){ console.error(err); alert('Failed to join program') }
              }}>
                <button>Join</button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
