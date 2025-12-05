import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase

// ========== HELPER FUNCTIONS ==========

// ======================================
// Upload image with reflection at once
// ======================================
export async function uploadCloseUpWithReflection({ room, message, file }) {
  const fileName = `${Date.now()}_${file.name}`;

  const { error: uploadError } = await supabase
    .storage
    .from('test-abby-close-ups')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) throw new Error(uploadError.message);

  const imageUrl = `${supabaseUrl}/storage/v1/object/public/test-abby-close-ups/${fileName}`;

  const { error: insertError } = await supabase
    .from('close_ups_test')
    .insert({ room_id: room, image_url: imageUrl });

  if (insertError) throw new Error(insertError.message);

  const { error: reflectionError } = await supabase
    .from('reflections_test')
    .insert({ reflection_message: message });

  if (reflectionError) throw new Error(reflectionError.message);
}


// ==================================
// Upload image to Supabase Storage
// ==================================
export async function uploadCloseupImage(file) {
  const fileName = `${Date.now()}_${file.name}`;

  const { error } = await supabase
    .storage
    .from('test-abby-close-ups')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

  if (error) throw new Error(error.message);

  const publicUrl = `${supabaseUrl}/storage/v1/object/public/test-abby-close-ups/${fileName}`;
  return publicUrl;
}

// ==============================
// Save close-up to DB
// ==============================
export async function saveCloseupToDB(roomId, imageUrl) {
  const { error } = await supabase
    .from('close_ups_test')
    .insert({ room_id: parseInt(roomId, 10), image_url: imageUrl });

  if (error) throw new Error(error.message);
}

// ==============================
// Save reflection message
// ==============================
export async function saveReflectionMessage(message) {
  const { error } = await supabase
    .from('reflections_test')
    .insert({ reflection_message: message });

  if (error) throw new Error(error.message);
}

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