import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Login() {
  const { signInWithGithub } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleGithub() {
    setError('')
    setLoading(true)
    try {
      await signInWithGithub()
      // Supabase redirects to GitHub here; on return, AuthContext picks up the session.
    } catch (err) {
      setError(err.message || 'Could not start sign-in. Try again.')
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="wordmark">
          Marginal<span className="dot">.</span>
        </div>
        <p className="auth-sub">Write things down, simply.</p>

        {error && <div className="auth-error">{error}</div>}

        <button
          className="btn btn-ghost"
          style={{ width: '100%', justifyContent: 'center', padding: '11px 16px' }}
          onClick={handleGithub}
          disabled={loading}
        >
          <GithubIcon />
          {loading ? 'Redirecting…' : 'Continue with GitHub'}
        </button>

        <p className="auth-hint">Your notes stay private to your account.</p>
      </div>
    </div>
  )
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.96.1-.75.4-1.25.73-1.53-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  )
}
