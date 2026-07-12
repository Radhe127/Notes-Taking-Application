import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { deleteNote, updateNote } from '../lib/notes.js'

export default function NoteEditor({ note, onClose, onSaved, onDeleted }) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [tab, setTab] = useState('write')
  const [saving, setSaving] = useState(false)
  const saveTimer = useRef(null)

  // Autosave, debounced, whenever title or content changes.
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
    if (!confirm('Delete this note? This cannot be undone.')) return
    await deleteNote(note.id)
    onDeleted(note.id)
  }

  return (
    <div className="editor-overlay" onClick={onClose}>
      <div className="editor-panel" onClick={(e) => e.stopPropagation()}>
        <div className="editor-topbar">
          <span style={{ fontSize: 12, color: 'var(--ink-soft)', fontFamily: 'var(--font-mono)' }}>
            {saving ? 'Saving…' : 'Saved'}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn btn-primary" onClick={onClose}>
              Done
            </button>
          </div>
        </div>

        <input
          className="editor-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
        />

        <div className="editor-tabs">
          <button
            className={`editor-tab ${tab === 'write' ? 'active' : ''}`}
            onClick={() => setTab('write')}
          >
            Write
          </button>
          <button
            className={`editor-tab ${tab === 'preview' ? 'active' : ''}`}
            onClick={() => setTab('preview')}
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
      </div>
    </div>
  )
}
