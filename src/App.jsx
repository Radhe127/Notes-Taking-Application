import { useAuth } from './contexts/AuthContext.jsx'
import LandingPage from './pages/LandingPage.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'

export default function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: 'var(--ink-soft)'
      }}>
        Loading…
      </div>
    )
  }

  // Show landing page if not logged in
  if (!user) {
    return <LandingPage />
  }

  return <Dashboard />
}