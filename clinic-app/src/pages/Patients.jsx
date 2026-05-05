import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPatients } from '../lib/db'

export default function Patients() {
  const navigate = useNavigate()
  const [patients, setPatients] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPatients()
  }, [])

  async function loadPatients(q = '') {
    setLoading(true)
    const { data } = await getPatients(q)
    setPatients(data || [])
    setLoading(false)
  }

  function handleSearch(e) {
    setSearch(e.target.value)
    loadPatients(e.target.value)
  }

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="page-title">Patients</div>
          <div className="page-sub">{patients.length} records</div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/patients/new')}>
          + New patient
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              className="search-input"
              placeholder="Search by name…"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading patients…</div>
        ) : patients.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">◎</div>
            <div className="empty-title">{search ? 'No patients found' : 'No patients yet'}</div>
            <div className="empty-sub">
              {search ? `No results for "${search}"` : 'Register your first patient to get started.'}
            </div>
            {!search && (
              <button className="btn btn-primary" onClick={() => navigate('/patients/new')}>
                Register first patient
              </button>
            )}
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>File no.</th>
                  <th>Phone</th>
                  <th>Visit type</th>
                  <th>Registered</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.id} onClick={() => navigate(`/patients/${p.id}`)}>
                    <td>
                      <div style={{ fontWeight: 500, marginBottom: 2 }}>{p.name}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--ink-lt)' }}>
                        {[p.age && `Age ${p.age}`, p.gender, p.occupation].filter(Boolean).join(' · ')}
                      </div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--ink-lt)' }}>
                      {p.file_number}
                    </td>
                    <td style={{ fontSize: 12.5 }}>{p.phone || '—'}</td>
                    <td>
                      <span className={`badge ${p.consultation_type === 'quick_relief' ? 'badge-sand' : 'badge-green'}`}>
                        {p.consultation_type === 'quick_relief' ? 'Quick Relief' : 'The Full Picture'}
                      </span>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--ink-lt)' }}>
                      {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
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
