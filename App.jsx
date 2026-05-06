import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './lib/auth'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import PatientDetail from './pages/PatientDetail'
import NewPatient from './pages/NewPatient'
import Tablet from './pages/Tablet'
import './index.css'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--cream)'
    }}>
      <div style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', color: 'var(--ink-lt)' }}>
        Loading…
      </div>
    </div>
  )
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  )
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />

      {/* Tablet route — no sidebar, full screen, no auth required */}
      <Route path="/tablet" element={<Tablet />} />

      <Route path="/" element={
        <ProtectedRoute>
          <AppLayout><Dashboard /></AppLayout>
        </ProtectedRoute>
      } />

      <Route path="/patients" element={
        <ProtectedRoute>
          <AppLayout><Patients /></AppLayout>
        </ProtectedRoute>
      } />

      <Route path="/patients/new" element={
        <ProtectedRoute>
          <AppLayout><NewPatient /></AppLayout>
        </ProtectedRoute>
      } />

      <Route path="/patients/:id" element={
        <ProtectedRoute>
          <AppLayout><PatientDetail /></AppLayout>
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
