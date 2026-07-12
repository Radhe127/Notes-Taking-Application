import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { createNote, fetchNotes } from '../lib/notes.js'
import Navbar from '../components/Navbar.jsx'
import NoteCard from '../components/NoteCard.jsx'
import NoteEditor from '../components/NoteEditor.jsx'

export default function Dashboard() {
  const { user } = useAuth()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeNote, setActiveNote] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    let active = true
    fetchNotes(user.id).then((data) => {
      if (active) {
        setNotes(data)
        setLoading(false)
      }
    })
    return () => {
      active = false
    }
  }, [user.id])

  async function handleNewNote() {
    const note = await createNote(user.id)
    setNotes((prev) => [note, ...prev])
    setActiveNote(note)
  }

  function handleSaved(updated) {
    setNotes((prev) =>
      [...prev.map((n) => (n.id === updated.id ? updated : n))].sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      )
    )
  }

  function handleDeleted(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id))
    setActiveNote(null)
  }

  return (
    <div className="main">
      <Navbar theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />

      <div className="content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Your notes</h2>
          <button className="btn btn-primary" onClick={handleNewNote}>
            + New note
          </button>
        </div>

        {loading ? (
          <div className="center-page" style={{ minHeight: '40vh' }}>
            <div className="spinner" />
          </div>
        ) : notes.length === 0 ? (
          <div className="empty-state">
            <h3>Nothing here yet</h3>
            <p>Create your first note and start writing in Markdown.</p>
            <button className="btn btn-primary" onClick={handleNewNote}>
              + New note
            </button>
          </div>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} onClick={() => setActiveNote(note)} />
            ))}
          </div>
        )}
      </div>

      {activeNote && (
        <NoteEditor
          note={activeNote}
          onClose={() => setActiveNote(null)}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  )
}
