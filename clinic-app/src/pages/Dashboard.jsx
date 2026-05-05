import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDashboardStats, getPatients } from '../lib/db'

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ totalPatients: 0, todayPatients: 0, totalReports: 0 })
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [statsData, patientsData] = await Promise.all([
        getDashboardStats(),
        getPatients()
      ])
      setStats(statsData)
      setRecent((patientsData.data || []).slice(0, 8))
      setLoading(false)
    }
    load()
  }, [])

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="page-title">Good morning, Dr. Priyanka.</div>
          <div className="page-sub">{today}</div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/patients/new')}>
          + New patient
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total patients</div>
          <div className="stat-value">{loading ? '—' : stats.totalPatients}</div>
          <div className="stat-sub">All time</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">New today</div>
          <div className="stat-value" style={{ color: 'var(--gold)' }}>
            {loading ? '—' : stats.todayPatients}
          </div>
          <div className="stat-sub">Registered today</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Reports generated</div>
          <div className="stat-value">{loading ? '—' : stats.totalReports}</div>
          <div className="stat-sub">Briefings & plans</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Recent patients</div>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/patients')}>
            View all
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading…</div>
        ) : recent.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🌿</div>
            <div className="empty-title">No patients yet</div>
            <div className="empty-sub">Your first patient record will appear here once registered.</div>
            <button className="btn btn-primary" onClick={() => navigate('/patients/new')}>
              Register first patient
            </button>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>File no.</th>
                  <th>Visit type</th>
                  <th>Registered</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(p => (
                  <tr key={p.id} onClick={() => navigate(`/patients/${p.id}`)}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{p.name}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--ink-lt)' }}>
                        {p.age ? `Age ${p.age}` : ''}{p.gender ? ` · ${p.gender}` : ''}{p.occupation ? ` · ${p.occupation}` : ''}
                      </div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--ink-lt)' }}>
                      {p.file_number}
                    </td>
                    <td>
                      <span className={`badge ${p.consultation_type === 'quick_relief' ? 'badge-sand' : 'badge-green'}`}>
                        {p.consultation_type === 'quick_relief' ? 'Quick Relief' : 'Full Picture'}
                      </span>
                    </td>
                    <td style={{ color: 'var(--ink-lt)', fontSize: 12 }}>
                      {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td>
                      <span className="badge badge-green">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
