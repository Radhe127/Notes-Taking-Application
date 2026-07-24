import Wordmark from './Wordmark.jsx'

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <div className="topbar">
      <Wordmark />
      <div style={{ flex: 1 }} />
      <button
        className="btn-icon"
        onClick={onToggleTheme}
        title="Toggle theme"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  )
}