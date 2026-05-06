export default function Tablet() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#1e6b5a'
    }}>
      <iframe
        src="/welcome.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
        title="Patient Welcome Screen"
      />
    </div>
  )
}
