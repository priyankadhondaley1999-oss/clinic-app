
import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPatient, getReportUrl, supabase } from '../lib/db'
import { buildQuickReliefPrompt, buildFullPicturePrompt, buildExamPrompt } from '../lib/prompts'

export default function PatientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [copyDone, setCopyDone] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadDone, setUploadDone] = useState('')
  const [reports, setReports] = useState([])
  const fileInputRef = useRef(null)

  useEffect(() => {
    load()
  }, [id])

  async function load() {
    const { data } = await getPatient(id)
    setPatient(data)
    setReports(data?.reports || [])
    setLoading(false)
  }

  async function copyPrompt(prompt) {
    await navigator.clipboard.writeText(prompt)
    setCopyDone(true)
    setTimeout(() => setCopyDone(false), 2500)
  }

  async function openReport(storagePath) {
    const url = await getReportUrl(storagePath)
    if (url) window.open(url, '_blank')
  }

  async function handleUpload(e) {
    const file = e.target.files[0]
    if (!file || !file.name.endsWith('.pdf')) {
      alert('Please select a PDF file.')
      return
    }

    setUploading(true)
    setUploadDone('')

    // Determine report type from filename
    const name = file.name.toLowerCase()
    let reportType = 'treatment_plan'
    if (name.includes('brief')) reportType = 'pre_consultation_brief'
    else if (name.includes('summary')) reportType = 'treatment_summary'
    else if (name.includes('plan') || name.includes('report')) reportType = 'treatment_plan'

    // Upload to Supabase storage
    const fileName = `${id}/${reportType}_${Date.now()}.pdf`
    const { error: uploadError } = await supabase.storage
      .from('patient-reports')
      .upload(fileName, file, { contentType: 'application/pdf' })

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message)
      setUploading(false)
      return
    }

    // Save record in reports table
    const { error: dbError } = await supabase
      .from('reports')
      .insert({
        patient_id: id,
        report_type: reportType,
        storage_path: fileName,
        prompt_used: file.name
      })

    if (dbError) {
      alert('Saved file but could not record it: ' + dbError.message)
    }

    setUploading(false)
    setUploadDone('✓ Uploaded successfully')
    setTimeout(() => setUploadDone(''), 3000)

    // Reload patient to refresh reports list
    load()
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  if (loading) return <div className="loading">Loading patient record…</div>
  if (!patient) return <div className="empty-state"><div className="empty-title">Patient not found</div></div>

  const intake = patient.intake_simple?.[0] || patient.intake_full?.[0]
  const hasSimpleIntake = patient.intake_simple?.length > 0
  const hasFullIntake = patient.intake_full?.length > 0
  const exams = patient.examinations || []

  const prompt = hasSimpleIntake
    ? buildQuickReliefPrompt(patient, patient.intake_simple[0])
    : hasFullIntake
    ? buildFullPicturePrompt(patient, patient.intake_full[0])
    : null

  const reportTypeLabel = (type) => {
    if (type === 'pre_consultation_brief') return 'Pre-consultation briefing'
    if (type === 'treatment_summary') return 'Treatment summary'
    return 'Treatment planning report'
  }

  return (
    <div>
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
            {[patient.age && `Age ${patient.age}`, patient.gender, patient.occupation, patient.address]
              .filter(Boolean).join(' · ')}
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {patient.phone && <span style={{ fontSize: 12, color: 'rgba(250,247,242,0.6)' }}>📞 {patient.phone}</span>}
            {patient.email && <span style={{ fontSize: 12, color: 'rgba(250,247,242,0.6)' }}>✉ {patient.email}</span>}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="patient-file">{patient.file_number}</div>
          <div style={{ marginTop: 8 }}>
            <span className="badge" style={{ background: 'rgba(196,168,130,0.25)', color: 'var(--bark)' }}>
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
                <p style={{ fontFamily: 'var(--sans)', fontSize: 13.5, lineHeight: 1.6 }}>
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
                  Copy the clinical prompt and paste into Claude.ai to generate the briefing PDF.
                </p>
                <div className="prompt-box" style={{ marginBottom: '1rem' }}>
                  {prompt.slice(0, 400)}…
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-primary" onClick={() => copyPrompt(prompt)}>
                    {copyDone ? '✓ Copied' : 'Copy full prompt'}
                  </button>
                  <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    Open Claude.ai →
                  </a>
                </div>
              </>
            ) : (
              <div className="empty-state" style={{ padding: '1.5rem 0' }}>
                <div className="empty-sub">No intake form data yet.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Intake tab */}
      {activeTab === 'intake' && (
        <div className="card">
          <div className="card-title" style={{ marginBottom: '1.25rem' }}>
            {hasSimpleIntake ? 'Quick Relief intake' : hasFullIntake ? 'Full Picture intake' : 'Intake form'}
          </div>
          {!intake ? (
            <div className="empty-state"><div className="empty-sub">No intake form submitted.</div></div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {Object.entries(intake.raw_data || {}).map(([key, value]) => {
                if (['id','patient_id','created_at','raw_data','consent_signed'].includes(key)) return null
                if (!value || (Array.isArray(value) && value.length === 0)) return null
                return (
                  <div key={key}>
                    <div style={{ fontFamily:'var(--sans)', fontSize:9.5, fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--ink-lt)', marginBottom:3 }}>
                      {key.replace(/_/g,' ')}
                    </div>
                    <div style={{ fontFamily:'var(--sans)', fontSize:13, color:'var(--ink)' }}>
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
                <div className="empty-sub">Examination records appear here after the consultation form is completed.</div>
              </div>
            </div>
          ) : (
            exams.map(exam => {
              const examPrompt = buildExamPrompt(patient, exam)
              return (
                <div key={exam.id} className="card" style={{ marginBottom: '1rem' }}>
                  <div className="card-header">
                    <div>
                      <div className="card-title">
                        {exam.exam_type === 'simple' ? 'Symptom consultation' : 'Full functional examination'}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--ink-lt)', marginTop: 3 }}>
                        {new Date(exam.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}
                      </div>
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={() => copyPrompt(examPrompt)}>
                      Copy treatment report prompt
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {exam.diagnosis && <div><div className="divider">Diagnosis</div><p style={{ fontSize:13 }}>{exam.diagnosis}</p></div>}
                    {exam.primary_diagnosis && <div><div className="divider">Primary diagnosis</div><p style={{ fontSize:13 }}>{exam.primary_diagnosis}</p></div>}
                    {exam.prescription && <div><div className="divider">Prescription</div><p style={{ fontSize:13 }}>{exam.prescription}</p></div>}
                    {exam.next_appointment && <div><div className="divider">Next appointment</div><p style={{ fontSize:13 }}>{exam.next_appointment}</p></div>}
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

          {/* Upload card */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className="card-header">
              <div>
                <div className="card-title">Upload a report PDF</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-lt)', marginTop: 3 }}>
                  After generating a briefing or treatment report in Claude.ai, upload the PDF here to save it to this patient's record.
                </div>
              </div>
            </div>

            {/* Tip on naming */}
            <div style={{
              background: 'rgba(30,107,90,0.05)',
              border: '0.5px solid rgba(30,107,90,0.15)',
              borderRadius: 10,
              padding: '10px 14px',
              fontFamily: 'var(--sans)',
              fontSize: 12,
              color: 'var(--ink-med)',
              lineHeight: 1.65,
              marginBottom: '1.25rem'
            }}>
              💡 <strong>Tip:</strong> The report type is detected automatically from the filename.<br/>
              Include <code>brief</code>, <code>summary</code>, or <code>plan</code> in the filename for correct labelling.<br/>
              e.g. <em>briefing_priya.pdf</em> · <em>treatment_summary_priya.pdf</em> · <em>treatment_plan_priya.pdf</em>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              onChange={handleUpload}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                className="btn btn-primary"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? 'Uploading…' : '↑ Upload PDF'}
              </button>
              {uploadDone && (
                <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--forest)', fontWeight: 500 }}>
                  {uploadDone}
                </span>
              )}
            </div>
          </div>

          {/* Reports list */}
          {reports.length === 0 ? (
            <div className="card">
              <div className="empty-state">
                <div className="empty-icon">✦</div>
                <div className="empty-title">No reports saved yet</div>
                <div className="empty-sub">
                  Generate a briefing or treatment report in Claude.ai, then upload the PDF above.
                </div>
              </div>
            </div>
          ) : (
            reports.map(report => (
              <div key={report.id} className="card" style={{
                marginBottom: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 38, height: 38,
                    borderRadius: 10,
                    background: 'rgba(30,107,90,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0
                  }}>
                    {report.report_type === 'pre_consultation_brief' ? '📋' :
                     report.report_type === 'treatment_summary' ? '📄' : '📊'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, marginBottom: 2 }}>
                      {reportTypeLabel(report.report_type)}
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--ink-lt)' }}>
                      Uploaded {new Date(report.generated_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                    </div>
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
