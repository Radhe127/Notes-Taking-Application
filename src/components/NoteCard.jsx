import { useState } from 'react'
import { stripMarkdown, timeAgo } from '../lib/format.js'

export default function NoteCard({
  note,
  onClick,
  onPin,
  onTrash,
  onRestore,
  onDelete,
  isTrash
}) {
  const [showActions, setShowActions] = useState(false)
  const excerpt = stripMarkdown(note.content).slice(0, 160)

  return (
    <div
      className="note-card"
      onClick={() => onClick(note)}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 className="note-title">
          {note.pinned && '📌 '}
          {note.title || 'Untitled'}
        </h3>
        <div style={{ display: 'flex', gap: 4, opacity: showActions ? 1 : 0.5 }}>
          {!isTrash && (
            <button
              className="btn-icon-small"
              onClick={(e) => { e.stopPropagation(); onPin(note) }}
              title={note.pinned ? 'Unpin' : 'Pin'}
            >
              {note.pinned ? '📌' : '📍'}
            </button>
          )}
          {!isTrash ? (
            <button
              className="btn-icon-small"
              onClick={(e) => { e.stopPropagation(); onTrash(note) }}
              title="Move to trash"
            >
              🗑️
            </button>
          ) : (
            <>
              <button
                className="btn-icon-small"
                onClick={(e) => { e.stopPropagation(); onRestore(note) }}
                title="Restore"
              >
                ↩️
              </button>
              <button
                className="btn-icon-small"
                onClick={(e) => { e.stopPropagation(); onDelete(note) }}
                title="Delete permanently"
              >
                ❌
              </button>
            </>
          )}
        </div>
      </div>
      <p className="note-excerpt">
        {excerpt || 'No content yet — click to start writing.'}
      </p>
      <div className="note-meta">
        <span>{timeAgo(note.updated_at)}</span>
        {note.trash && <span style={{ marginLeft: 8, color: 'var(--danger)' }}>🗑️ Trash</span>}
      </div>
    </div>
  )
}