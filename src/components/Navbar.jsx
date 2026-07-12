import { useAuth } from '../contexts/AuthContext.jsx'

export default function Navbar({ theme, onToggleTheme }) {
  const { user, signOut } = useAuth()

  return (
    <div className="topbar">
      <div className="wordmark">
        Marginal<span className="dot">.</span>
      </div>

      <div style={{ flex: 1 }} />

      <button className="btn-icon" onClick={onToggleTheme} title="Toggle theme" aria-label="Toggle theme">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{user?.email}</span>

      <button className="btn btn-ghost" onClick={signOut}>
        Sign out
      </button>
    </div>
  )
}
