import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase

// TICKET PAGE

// ==============================
// Fetch Ticket
// ==============================
// About the function:
// 1. Fetches the latest ticket from the tickets table.
// 2. Falls back to a random ticket if the latest one fails.
// 3. Retrieves the clue based on the room_id in that ticket.
// 4. Returns the ticket, clue, and ticket ID.

export async function getTicketWithClue() {
  let ticket;

  // 1. Try to get the latest ticket
  const { data: latest, error: latestError } = await supabase
    .from("tickets")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (latestError) {
    console.warn("Latest ticket fetch failed, trying random:", latestError);

    // 2. Fallback: Get a random ticket
    const { data: random, error: randomError } = await supabase
      .from("tickets")
      .select("*")
      .limit(1)
      .single();

    if (randomError) {
      console.error("Both latest and random ticket fetch failed:", randomError);
      throw randomError;
    }

    ticket = random;
  } else {
    ticket = latest;
  }

  // 3. Get clue by ticket.room_id
  if (!ticket || !ticket.room_id) {
    throw new Error("No ticket found or ticket missing room_id");
  }
  const { data: clue, error: clueError } = await supabase
    .from("room_clues")
    .select("*")
    .eq("room_id", ticket.room_id)
    .limit(1)
    .single();

  if (clueError) {
    console.error("Error fetching clue for room_id", ticket.room_id, clueError);
    throw clueError;
  }

  return {
    ticketId: ticket.ticket_id,
    ticketImage: ticket.image_url,
    ticketClue: clue.room_clue,
  };
}

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
// Fetch last submitted close-up
// ==============================
export async function getLatestCloseup() {
  const { data, error } = await supabase
    .from("close_ups_test")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single(); // Get just one row

  if (error) {
    console.error("Error fetching latest close-up:", error);
    throw error;
  }

  return data;
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