import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { deleteNote, updateNote } from '../lib/notes.js'

export default function NoteEditor({
  note,
  onClose,
  onSaved,
  onDeleted,
  onAction,
  isTrash
}) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [tab, setTab] = useState('write')
  const [saving, setSaving] = useState(false)
  const saveTimer = useRef(null)

  useEffect(() => {
    if (title === note.title && content === note.content) return
    setSaving(true)
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      const updated = await updateNote(note.id, { title: title || 'Untitled', content })
      onSaved(updated)
      setSaving(false)
    }, 600)
    return () => clearTimeout(saveTimer.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content])

  async function handleDelete() {
    if (!confirm('Permanently delete this note? This cannot be undone.')) return
    await deleteNote(note.id)
    onDeleted(note.id)
  }

  async function handleTrash() {
    if (!confirm('Move this note to trash?')) return
    const updated = await updateNote(note.id, { trash: true })
    onSaved(updated)
    onAction('trash', note)
  }

  async function handleRestore() {
    const updated = await updateNote(note.id, { trash: false })
    onSaved(updated)
    onAction('restore', note)
  }

  async function handlePin() {
    const updated = await updateNote(note.id, { pinned: !note.pinned })
    onSaved(updated)
    onAction('pin', note)
  }

  return (
    <div className="editor-overlay" onClick={onClose}>
      <div className="editor-panel" onClick={(e) => e.stopPropagation()}>
        <div className="editor-topbar">
          <span style={{ fontSize: 12, color: 'var(--ink-soft)', fontFamily: 'var(--font-mono)' }}>
            {saving ? 'Saving…' : 'Saved'}
            {note.pinned && ' 📌'}
            {note.trash && ' 🗑️'}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {!isTrash ? (
              <>
                <button className="btn btn-ghost btn-sm" onClick={handlePin}>
                  {note.pinned ? '📌 Unpin' : '📍 Pin'}
                </button>
                <button className="btn btn-danger btn-sm" onClick={handleTrash}>
                  🗑️ Trash
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-ghost btn-sm" onClick={handleRestore}>
                  ↩️ Restore
                </button>
                <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                  ❌ Delete Forever
                </button>
              </>
            )}
            <button className="btn btn-primary btn-sm" onClick={onClose}>
              Done
            </button>
          </div>
        </div>

        <input
          className="editor-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          disabled={isTrash}
        />

        <div className="editor-tabs">
          <button
            className={`editor-tab ${tab === 'write' ? 'active' : ''}`}
            onClick={() => setTab('write')}
            disabled={isTrash}
          >
            Write
          </button>
          <button
            className={`editor-tab ${tab === 'preview' ? 'active' : ''}`}
            onClick={() => setTab('preview')}
            disabled={isTrash}
          >
            Preview
          </button>
        </div>

        {tab === 'write' ? (
          <textarea
            className="editor-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing in Markdown… **bold**, _italic_, `code`, - lists, > quotes"
            autoFocus
            disabled={isTrash}
          />
        ) : (
          <div className="markdown-preview">
            {content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            ) : (
              <p style={{ color: 'var(--ink-soft)' }}>Nothing to preview yet.</p>
            )}
          </div>
        )}

        {isTrash && (
          <div style={{ marginTop: 12, padding: '10px 16px', background: 'var(--glass-white-light)', borderRadius: '10px', fontSize: 14, color: 'var(--ink-soft)', textAlign: 'center' }}>
            🗑️ This note is in trash. Restore it to edit.
          </div>
        )}
      </div>
    </div>
  )
}