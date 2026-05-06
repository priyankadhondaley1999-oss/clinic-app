import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth'

const navItems = [
  { icon: '◎', label: 'Dashboard', path: '/' },
  { icon: '◈', label: 'Patients', path: '/patients' },
  { icon: '✦', label: 'New Patient', path: '/patients/new' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, signOut } = useAuth()

  function openTablet() {
    window.open('/tablet', '_blank', 'fullscreen=yes')
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-name">Functional<br/>Dentistry</div>
        <div className="sidebar-logo-sub">Dr. Priyanka Dhondaley</div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        {/* Patient tablet button */}
        <div style={{ padding: '0 0.75rem', marginBottom: '0.5rem' }}>
          <button
            onClick={openTablet}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 14px',
              background: 'rgba(196,168,130,0.18)',
              border: '1px solid rgba(196,168,130,0.3)',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'background 0.2s',
              textAlign: 'left',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(196,168,130,0.28)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(196,168,130,0.18)'}
          >
            <span style={{ fontSize: 20 }}>⬚</span>
            <div>
              <div style={{
                fontFamily: 'var(--sans)',
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--cream)',
                marginBottom: 1
              }}>Patient tablet</div>
              <div style={{
                fontFamily: 'var(--sans)',
                fontSize: 10,
                color: 'rgba(250,247,242,0.5)',
              }}>Open welcome screen</div>
            </div>
          </button>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">{user?.email}</div>
        <button
          className="nav-item"
          style={{ padding: '6px 0', fontSize: 11.5 }}
          onClick={signOut}
        >
          <span className="nav-icon">→</span>
          Sign out
        </button>
      </div>
    </div>
  )
}
