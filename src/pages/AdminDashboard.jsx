import React, { useEffect, useState } from 'react'
import AdminResourceManager from '../components/AdminResourceManager'
import AdminProgramManager from '../components/AdminProgramManager'

export default function AdminDashboard(){
  const [metrics, setMetrics] = useState(null)

  useEffect(()=>{
    let mounted = true
    (async ()=>{
      try{
        const data = await getJson('/api/metrics')
        if(mounted) setMetrics(data)
      }catch(e){ }
    })()
    return ()=> mounted = false
  },[])

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <section>
        <h3>Platform Metrics</h3>
        {metrics ? (
          <ul>
            <li>Users: {metrics.users}</li>
            <li>Resources: {metrics.resources}</li>
            <li>Programs: {metrics.programs}</li>
          </ul>
        ) : <div>Loading...</div>}
      </section>

      <section>
        <h3>Manage Resources</h3>
        <AdminResourceManager />
      </section>

      <section>
        <h3>Create Wellness Programs</h3>
        <AdminProgramManager />
      </section>
    </div>
  )
}
