import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPatient, getReportUrl } from '../lib/db'
import { buildQuickReliefPrompt, buildFullPicturePrompt, buildExamPrompt } from '../lib/prompts'

export default function PatientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [copyDone, setCopyDone] = useState(false)

  useEffect(() => {
    async function load() {
      const { data } = await getPatient(id)
      setPatient(data)
      setLoading(false)
    }
    load()
  }, [id])

  async function copyPrompt(prompt) {
    await navigator.clipboard.writeText(prompt)
    setCopyDone(true)
    setTimeout(() => setCopyDone(false), 2500)
  }

  async function openReport(storagePath) {
    const url = await getReportUrl(storagePath)
    if (url) window.open(url, '_blank')
  }

  if (loading) return <div className="loading">Loading patient record…</div>
  if (!patient) return <div className="empty-state"><div className="empty-title">Patient not found</div></div>

  const intake = patient.intake_simple?.[0] || patient.intake_full?.[0]
  const hasSimpleIntake = patient.intake_simple?.length > 0
  const hasFullIntake = patient.intake_full?.length > 0
  const exams = patient.examinations || []
  const reports = patient.reports || []

  // Build prompt for copy
  const prompt = hasSimpleIntake
    ? buildQuickReliefPrompt(patient, patient.intake_simple[0])
    : hasFullIntake
    ? buildFullPicturePrompt(patient, patient.intake_full[0])
    : null

  return (
    <div>
      {/* Back */}
      <button
        className="btn btn-secondary btn-sm"
        style={{ marginBottom: '1rem' }}
        onClick={() => navigate('/patients')}
      >
        ← Back to patients
      </button>

      {/* Patient header */}
      <div className="patient-profile-header">
        <div>
          <div className="patient-name">{patient.name}</div>
          <div className="patient-meta">
            {[
              patient.age && `Age ${patient.age}`,
              patient.gender,
              patient.occupation,
              patient.address
            ].filter(Boolean).join(' · ')}
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {patient.phone && (
              <span style={{ fontSize: 12, color: 'rgba(250,247,242,0.6)' }}>📞 {patient.phone}</span>
            )}
            {patient.email && (
              <span style={{ fontSize: 12, color: 'rgba(250,247,242,0.6)' }}>✉ {patient.email}</span>
            )}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="patient-file">{patient.file_number}</div>
          <div style={{ marginTop: 8 }}>
            <span className={`badge ${patient.consultation_type === 'quick_relief' ? 'badge-sand' : 'badge-green'}`}
              style={{ background: 'rgba(196,168,130,0.25)', color: 'var(--bark)' }}>
              {patient.consultation_type === 'quick_relief' ? 'Quick Relief' : 'The Full Picture'}
            </span>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(250,247,242,0.4)', marginTop: 6 }}>
            Registered {new Date(patient.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {['overview', 'intake', 'examinations', 'reports'].map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'reports' && reports.length > 0 && (
              <span style={{
                marginLeft: 6, background: 'var(--forest)', color: 'white',
                borderRadius: '100px', fontSize: 9, padding: '1px 6px', fontWeight: 600
              }}>{reports.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="card">
            <div className="card-title" style={{ marginBottom: '1rem' }}>Quick summary</div>
            {intake ? (
              <>
                <div className="divider">Chief complaint</div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink)' }}>
                  {intake.complaint || '—'}
                </p>
                <div className="divider">Duration</div>
                <p style={{ fontSize: 13, color: 'var(--ink-med)' }}>{intake.duration || '—'}</p>
                {intake.pain_score && (
                  <>
                    <div className="divider">Pain score</div>
                    <p style={{ fontSize: 13 }}>{intake.pain_score} / 10</p>
                  </>
                )}
              </>
            ) : (
              <p style={{ fontSize: 13, color: 'var(--ink-lt)' }}>No intake form submitted yet.</p>
            )}
          </div>

          <div className="card">
            <div className="card-title" style={{ marginBottom: '1rem' }}>Generate briefing</div>
            {prompt ? (
              <>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--ink-med)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Copy the clinical prompt below and paste it into Claude.ai to generate the pre-consultation briefing PDF.
                </p>
                <div className="prompt-box" style={{ marginBottom: '1rem' }}>
                  {prompt.slice(0, 400)}…
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => copyPrompt(prompt)}
                  >
                    {copyDone ? '✓ Copied' : 'Copy full prompt'}
                  </button>
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Open Claude.ai →
                  </a>
                </div>
              </>
            ) : (
              <div className="empty-state" style={{ padding: '1.5rem 0' }}>
                <div className="empty-sub">No intake form data yet. Patient must complete the welcome flow first.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Intake tab */}
      {activeTab === 'intake' && (
        <div className="card">
          <div className="card-title" style={{ marginBottom: '1.25rem' }}>
            {hasSimpleIntake ? 'Quick Relief intake form' : hasFullIntake ? 'Full Picture intake form' : 'Intake form'}
          </div>
          {!intake ? (
            <div className="empty-state">
              <div className="empty-sub">No intake form submitted for this patient.</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {Object.entries(intake.raw_data || {}).map(([key, value]) => {
                if (['id', 'patient_id', 'created_at', 'raw_data', 'consent_signed'].includes(key)) return null
                if (!value || (Array.isArray(value) && value.length === 0)) return null
                return (
                  <div key={key}>
                    <div style={{
                      fontFamily: 'var(--sans)', fontSize: 9.5, fontWeight: 500,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: 'var(--ink-lt)', marginBottom: 3
                    }}>
                      {key.replace(/_/g, ' ')}
                    </div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)' }}>
                      {Array.isArray(value) ? value.join(', ') : String(value)}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Examinations tab */}
      {activeTab === 'examinations' && (
        <div>
          {exams.length === 0 ? (
            <div className="card">
              <div className="empty-state">
                <div className="empty-icon">◈</div>
                <div className="empty-title">No examinations yet</div>
                <div className="empty-sub">Examination records will appear here after the consultation form is completed.</div>
              </div>
            </div>
          ) : (
            exams.map((exam, i) => {
              const examPrompt = buildExamPrompt(patient, exam)
              return (
                <div key={exam.id} className="card" style={{ marginBottom: '1rem' }}>
                  <div className="card-header">
                    <div>
                      <div className="card-title">
                        {exam.exam_type === 'simple' ? 'Symptom consultation' : 'Full functional examination'}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--ink-lt)', marginTop: 3 }}>
                        {new Date(exam.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => copyPrompt(examPrompt)}
                    >
                      Copy treatment report prompt
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {exam.diagnosis && <div><div className="divider">Diagnosis</div><p style={{ fontSize: 13 }}>{exam.diagnosis}</p></div>}
                    {exam.primary_diagnosis && <div><div className="divider">Primary diagnosis</div><p style={{ fontSize: 13 }}>{exam.primary_diagnosis}</p></div>}
                    {exam.prescription && <div><div className="divider">Prescription</div><p style={{ fontSize: 13 }}>{exam.prescription}</p></div>}
                    {exam.next_appointment && <div><div className="divider">Next appointment</div><p style={{ fontSize: 13 }}>{exam.next_appointment}</p></div>}
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* Reports tab */}
      {activeTab === 'reports' && (
        <div>
          {reports.length === 0 ? (
            <div className="card">
              <div className="empty-state">
                <div className="empty-icon">✦</div>
                <div className="empty-title">No reports saved yet</div>
                <div className="empty-sub">
                  Generate a briefing or treatment report using the prompts in the Overview tab,
                  then save the PDF here to build this patient's clinical record.
                </div>
              </div>
            </div>
          ) : (
            reports.map(report => (
              <div key={report.id} className="card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 3 }}>
                    {report.report_type === 'pre_consultation_brief' ? 'Pre-consultation briefing' :
                     report.report_type === 'treatment_summary' ? 'Treatment summary' :
                     'Treatment planning report'}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-lt)' }}>
                    Generated {new Date(report.generated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => openReport(report.storage_path)}
                >
                  Open PDF →
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
