import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import Wordmark from '../components/Wordmark.jsx'
import GithubIcon from '../components/GithubIcon.jsx'

export default function Login() {
  const { signInWithGithub } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleGithub() {
    setError('')
    setLoading(true)
    try {
      await signInWithGithub()
    } catch (err) {
      setError(err.message || 'Could not start sign-in. Try again.')
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="glass-bg" aria-hidden="true">
        <div className="orb"></div>
        <div className="orb"></div>
        <div className="orb"></div>
      </div>
      <div className="auth-card">
        <Wordmark size={28} />
        <p className="auth-sub">Write things down, simply.</p>

        {error && <div className="auth-error">{error}</div>}

        <button
          className="btn btn-ghost"
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