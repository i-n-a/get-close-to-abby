import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase


// ==============================
// Fetch one random close-up
// ==============================
export async function getRandomCloseup() {
  const { data, error } = await supabase
    .from("close_ups")
    .select("*")
    .limit(1)
    .single(); // Gets one row

  if (error) {
    console.error("Error fetching close-up:", error);
    throw error;
  }

  return data;
}

// ==============================
// Fetch clue by close-up ID (or random)
// ==============================
export async function getClueForCloseup(roomId) {
  const { data, error } = await supabase
    .from("room_clues")
    .select("*")
    .eq("room_id", roomId) // Replace this with your FK column
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching clue:", error);
    throw error;
  }

  return data;
}