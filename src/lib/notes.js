import { supabase } from '../supabaseClient'

export async function fetchNotes(userId) {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createNote(userId) {
  const { data, error } = await supabase
    .from('notes')
    .insert({ user_id: userId, title: 'Untitled', content: '' })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateNote(id, patch) {
  const { data, error } = await supabase
    .from('notes')
    .update(patch)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteNote(id) {
  const { error } = await supabase.from('notes').delete().eq('id', id)
  if (error) throw error
}
