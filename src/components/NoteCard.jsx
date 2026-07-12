import { stripMarkdown, timeAgo } from '../lib/format.js'

export default function NoteCard({ note, onClick }) {
  const excerpt = stripMarkdown(note.content).slice(0, 160)

  return (
    <div className="note-card" onClick={onClick}>
      <h3 className="note-title">{note.title || 'Untitled'}</h3>
      <p className="note-excerpt">{excerpt || 'No content yet — click to start writing.'}</p>
      <div className="note-meta">
        <span>{timeAgo(note.updated_at)}</span>
      </div>
    </div>
  )
}
