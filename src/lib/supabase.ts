import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type WaitingListEntry = {
  id?: number  // bigint auto-generated
  email: string
  name?: string  // optionnel - peut être ajouté à la table plus tard
  created_at?: string  // timestamp with time zone
}

export async function addToWaitingList(email: string, name?: string) {
  try {
    // Tentative d'insertion avec le champ 'name' (si la colonne existe)
    const { data, error } = await supabase
      .from('waiting_list')
      .insert([{
        email,
        name
      }])
      .select()

    if (error) {
      // Si l'erreur indique que la colonne 'name' n'existe pas,
      // on essaie sans le champ name
      if (error.message.includes('name') || error.code === '42703') {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('waiting_list')
          .insert([{
            email: name ? `${name} - ${email}` : email,  // Concatener le nom dans l'email
          }])
          .select()

        if (fallbackError) {
          throw fallbackError
        }

        return fallbackData
      }
      
      throw error
    }

    return data
  } catch (err) {
    throw err
  }
}