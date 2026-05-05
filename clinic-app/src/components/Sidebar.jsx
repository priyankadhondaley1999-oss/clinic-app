import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth'

const navItems = [
  { icon: '◎', label: 'Dashboard', path: '/' },
  { icon: '◈', label: 'Patients', path: '/patients' },
  { icon: '✦', label: 'New Patient', path: '/patients/new' },
  { icon: '⬡', label: 'Today\'s Queue', path: '/today' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, signOut } = useAuth()

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

        <div style={{ padding: '0 1.25rem', marginTop: '1rem' }}>
          <div style={{
            height: '0.5px',
            background: 'rgba(255,255,255,0.1)',
            marginBottom: '0.75rem'
          }}/>
          <div style={{
            fontFamily: 'var(--sans)',
            fontSize: 10,
            color: 'rgba(250,247,242,0.35)',
            letterSpacing: '0.06em',
            marginBottom: '4px',
            textTransform: 'uppercase'
          }}>Patient tablet</div>
          <button
            className="nav-item"
            style={{ padding: '7px 0' }}
            onClick={() => window.open('/tablet', '_blank')}
          >
            <span className="nav-icon">⬚</span>
            Open welcome screen
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
