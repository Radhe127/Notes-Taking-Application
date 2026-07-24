export function stripMarkdown(text) {
  return text.replace(/(\*\*|__|~~|`|#|\n)/g, '').trim()
}

export function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime()
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago'
  if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago'
  if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago'
  return new Date(ts).toLocaleDateString()
}