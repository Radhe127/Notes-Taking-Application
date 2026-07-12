import { useAuth } from './contexts/AuthContext.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'

export default function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="center-page">
        <div className="spinner" />
      </div>
    )
  }

  return user ? <Dashboard /> : <Login />
}
