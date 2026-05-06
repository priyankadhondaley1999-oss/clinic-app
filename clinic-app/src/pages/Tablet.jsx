import { useEffect } from 'react'

// Redirects to the welcome.html file served from public folder
// The ?v= param forces a fresh load every time
export default function Tablet() {
  useEffect(() => {
    // Replace current location entirely so React router doesn't intercept
    window.location.replace('/welcome.html?v=' + Date.now())
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1e6b5a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Georgia, serif',
      color: 'rgba(250,247,242,0.6)',
      fontSize: '1.1rem'
    }}>
      Opening patient welcome screen…
    </div>
  )
}
