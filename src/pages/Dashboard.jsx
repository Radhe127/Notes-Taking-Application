import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import Navbar from '../components/Navbar.jsx'
import NoteCard from '../components/NoteCard.jsx'
import NoteEditor from '../components/NoteEditor.jsx'
import Wordmark from '../components/Wordmark.jsx'
import { getNotes, createNote, deleteNote, updateNote } from '../lib/notes.js'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [filter, setFilter] = useState('all')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('note-theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('note-theme', theme)
  }, [theme])

  useEffect(() => { loadNotes() }, [])

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

  const filteredNotes = notes.filter(note => {
    if (filter === 'all') return !note.trash && !note.pinned
    if (filter === 'pinned') return note.pinned && !note.trash
    if (filter === 'trash') return note.trash
    return true
  })

  const allCount = notes.filter(n => !n.trash && !n.pinned).length
  const pinnedCount = notes.filter(n => n.pinned && !n.trash).length
  const trashCount = notes.filter(n => n.trash).length

  const togglePin = async (note) => {
    const updated = await updateNote(note.id, { pinned: !note.pinned })
    setNotes(prev => prev.map(n => n.id === updated.id ? updated : n))
    if (selectedNote?.id === note.id) setSelectedNote(updated)
  }

  const moveToTrash = async (note) => {
    const updated = await updateNote(note.id, { trash: true })
    setNotes(prev => prev.map(n => n.id === updated.id ? updated : n))
    setSelectedNote(null)
  }

  const restoreFromTrash = async (note) => {
    const updated = await updateNote(note.id, { trash: false })
    setNotes(prev => prev.map(n => n.id === updated.id ? updated : n))
    setSelectedNote(null)
  }

  const permanentlyDelete = async (note) => {
    if (!confirm('Permanently delete this note? This cannot be undone.')) return
    await deleteNote(note.id)
    setNotes(prev => prev.filter(n => n.id !== note.id))
    setSelectedNote(null)
  }

  const handleNoteAction = (action, note) => {
    if (action === 'trash') moveToTrash(note)
    else if (action === 'restore') restoreFromTrash(note)
    else if (action === 'delete') permanentlyDelete(note)
    else if (action === 'pin') togglePin(note)
  }

  return (
    <div className="app-shell">
      <div className="glass-bg" aria-hidden="true">
        <div className="orb"></div>
        <div className="orb"></div>
        <div className="orb"></div>
      </div>

      <aside className="sidebar">
        <Wordmark />
        <div className="sidebar-section">
          <span className="sidebar-label">Navigation</span>
          <div className={`nav-item ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            📝 All Notes <span className="nav-count">{allCount}</span>
          </div>
          <div className={`nav-item ${filter === 'pinned' ? 'active' : ''}`} onClick={() => setFilter('pinned')}>
            📌 Pinned <span className="nav-count">{pinnedCount}</span>
          </div>
          <div className={`nav-item ${filter === 'trash' ? 'active' : ''}`} onClick={() => setFilter('trash')}>
            🗑️ Trash <span className="nav-count">{trashCount}</span>
          </div>
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

      <main className="main-content">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        {filter === 'trash' && (
          <div style={{ marginBottom: 16, padding: '8px 14px', background: 'var(--glass-white-light)', borderRadius: '10px', fontSize: 14, color: 'var(--ink-soft)' }}>
            🗑️ Notes in trash will be automatically deleted after 30 days
          </div>
        )}

        {filteredNotes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--ink-soft)' }}>
            <p style={{ fontSize: 18, marginBottom: 8 }}>
              {filter === 'all' && 'No notes yet.'}
              {filter === 'pinned' && 'No pinned notes.'}
              {filter === 'trash' && 'Trash is empty.'}
            </p>
            <p>
              {filter === 'all' && 'Click "New Note" to start writing.'}
              {filter === 'pinned' && 'Pin notes to keep them at the top.'}
              {filter === 'trash' && 'Deleted notes appear here.'}
            </p>
          </div>
        ) : (
          <div className="note-grid">
            {filteredNotes.map((n) => (
              <NoteCard
                key={n.id}
                note={n}
                onClick={handleNoteClick}
                onPin={togglePin}
                onTrash={moveToTrash}
                onRestore={restoreFromTrash}
                onDelete={permanentlyDelete}
                isTrash={filter === 'trash'}
              />
            ))}
          </div>
        )}

        {selectedNote && (
          <NoteEditor
            note={selectedNote}
            onClose={handleEditorClose}
            onSaved={handleNoteSaved}
            onDeleted={handleNoteDeleted}
            onAction={handleNoteAction}
            isTrash={filter === 'trash'}
          />
        )}
      </main>
    </div>
  )
}