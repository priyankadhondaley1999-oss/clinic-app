import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPatient } from '../lib/db'

export default function NewPatient() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', age: '', gender: '', phone: '', email: '',
    address: '', occupation: '', referred_by: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSave() {
    if (!form.name.trim()) { setError('Patient name is required.'); return }
    setSaving(true)
    setError('')

    const { data, error } = await createPatient({
      name: form.name.trim(),
      age: form.age ? parseInt(form.age) : null,
      gender: form.gender || null,
      phone: form.phone || null,
      email: form.email || null,
      address: form.address || null,
      occupation: form.occupation || null,
      referred_by: form.referred_by || null,
    })

    if (error) {
      setError('Failed to create patient. Please try again.')
      setSaving(false)
      return
    }

    navigate(`/patients/${data.id}`)
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <div className="page-header">
        <button
          className="btn btn-secondary btn-sm"
          style={{ marginBottom: '1rem' }}
          onClick={() => navigate('/patients')}
        >
          ← Back
        </button>
        <div className="page-title">Register new patient</div>
        <div className="page-sub">
          Create the patient record. The detailed intake form is completed by the patient on the tablet via the welcome screen.
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <div className="card-title" style={{ marginBottom: '1.25rem' }}>Patient details</div>

        {error && (
          <div style={{
            fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--danger)',
            background: 'rgba(192,57,43,0.07)', border: '0.5px solid rgba(192,57,43,0.2)',
            borderRadius: 8, padding: '8px 12px', marginBottom: '1rem'
          }}>{error}</div>
        )}

        <div className="form-grid-2">
          <div className="form-group form-full">
            <label className="form-label">Full name *</label>
            <input
              className="form-input"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Patient's full name"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Age</label>
            <input className="form-input" type="number" min="1" max="120"
              value={form.age} onChange={e => set('age', e.target.value)} placeholder="Years" />
          </div>
          <div className="form-group">
            <label className="form-label">Gender</label>
            <select className="form-select" value={form.gender} onChange={e => set('gender', e.target.value)}>
              <option value="">Select</option>
              <option>Female</option>
              <option>Male</option>
              <option>Non-binary / other</option>
              <option>Prefer not to say</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Phone number</label>
            <input className="form-input" type="tel"
              value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91" />
          </div>
          <div className="form-group">
            <label className="form-label">Email address</label>
            <input className="form-input" type="email"
              value={form.email} onChange={e => set('email', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Occupation</label>
            <input className="form-input"
              value={form.occupation} onChange={e => set('occupation', e.target.value)} />
          </div>
          <div className="form-group form-full">
            <label className="form-label">Address / city</label>
            <input className="form-input"
              value={form.address} onChange={e => set('address', e.target.value)} placeholder="City, State" />
          </div>
          <div className="form-group form-full">
            <label className="form-label">Referred by</label>
            <input className="form-input"
              value={form.referred_by} onChange={e => set('referred_by', e.target.value)}
              placeholder="Doctor / friend / social media" />
          </div>
        </div>

      </div>

      <div className="card" style={{
        background: 'rgba(30,107,90,0.05)',
        border: '0.5px solid rgba(30,107,90,0.15)',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--forest)', fontWeight: 500, marginBottom: 6 }}>
          Next step after saving
        </div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--ink-med)', lineHeight: 1.65 }}>
          After registering the patient, hand them a tablet with the welcome screen open.
          Their detailed intake form data will automatically be linked to this patient record when they submit.
          <br/><br/>
          <strong>Open welcome screen:</strong> Click "Open welcome screen" in the sidebar, then paste the patient's
          file number so the form auto-populates their name.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save patient record'}
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/patients')}>
          Cancel
        </button>
      </div>
    </div>
  )
}
