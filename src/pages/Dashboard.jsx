import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import Navbar from '../components/Navbar.jsx'
import NoteCard from '../components/NoteCard.jsx'
import NoteEditor from '../components/NoteEditor.jsx'
import Wordmark from '../components/Wordmark.jsx'
import { getNotes, createNote } from '../lib/notes.js'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('note-theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('note-theme', theme)
  }, [theme])

  useEffect(() => {
    loadNotes()
  }, [])

  async function loadNotes() {
    const data = await getNotes()
    setNotes(data)
  }

  const handleNoteClick = (note) => setSelectedNote(note)
  const handleEditorClose = () => setSelectedNote(null)

  const handleNoteSaved = (updated) => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)))
    setSelectedNote(updated)
  }

  const handleNoteDeleted = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
    setSelectedNote(null)
  }

  const handleCreateNote = async () => {
    const newNote = await createNote()
    setNotes((prev) => [newNote, ...prev])
    setSelectedNote(newNote)
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="app-shell">
      <div className="glass-bg" aria-hidden="true">
        <div className="orb"></div>
        <div className="orb"></div>
        <div className="orb"></div>
      </div>

      {/* Sidebar */}
      <aside className="sidebar">
        <Wordmark />
        <div className="sidebar-section">
          <span className="sidebar-label">Navigation</span>
          <div className="nav-item active">📝 All Notes</div>
          <div className="nav-item">📌 Pinned</div>
          <div className="nav-item">🗑️ Trash</div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleCreateNote}>
            + New Note
          </button>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--ink-soft)' }}>
            <span>{user?.email}</span>
            <button className="btn btn-ghost btn-sm" onClick={signOut}>Sign out</button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        {notes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--ink-soft)' }}>
            <p style={{ fontSize: 18, marginBottom: 8 }}>No notes yet.</p>
            <p>Click "New Note" to start writing.</p>
          </div>
        ) : (
          <div className="note-grid">
            {notes.map((n) => (
              <NoteCard key={n.id} note={n} onClick={handleNoteClick} />
            ))}
          </div>
        )}

        {selectedNote && (
          <NoteEditor
            note={selectedNote}
            onClose={handleEditorClose}
            onSaved={handleNoteSaved}
            onDeleted={handleNoteDeleted}
          />
        )}
      </main>
    </div>
  )
}