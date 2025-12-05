import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase


// OPEN INVITATION PAGE + CHAT PAGE

// ================================================
// Fetch Invitations, Participants, and Profiles
// ================================================

// Submit form for open invitation
export async function insertOpenInvitation({ action, activity, room, signedBy }) {
  const invitation_token = uuidv4();
  const { error: insertError } = await supabase
    .from('open_invitations')
    .insert({
      activity_tag: action,
      activity_what: activity,
      room_id: room,
      signed_by: signedBy,
      invitation_token,
    });

  if (insertError) throw new Error(insertError.message);
}


//Get Ticket info by ticketId
export async function getTicketById(ticketId) {
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("ticket_id", ticketId)
    .single();

  return { data, error };
}


// Fetch all profiles
export async function getAllProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*");

  if (error) {
    console.error("Error fetching profiles:", error);
    return [];
  }
  return data;
}

// Fetch invitation by token
export async function getInvitationByToken(token) {
  if(!token) {
    console.error("No token provided for fetching invitation");
    return null;
  }
  // Fetch the invitation using the provided token
  const { data,error} = await supabase
  .from("open_invitations")
  .select(`
    id,
    activity_what,
    activity_tag,
    room_id,
    room:room_id (
      room_name
    ),
    invitation_token
  `)
  .eq("invitation_token", token) 
  .single();

  if (error || !data ) {
    console.error("Invitation error:", error);
    return null;
  }

  return data;
}

// Fetch invitation ID by token only
export async function getInvitationIdByToken(token) {
  const { data, error } = await supabase
    .from("open_invitations")
    .select("id")
    .eq("invitation_token", token)
    .single();

  if (error || !data) {
    console.error("Invitation not found or error:", error);
    return null;
  }

  return data.id;
}


// Fetch participants for an invitation ID
export async function getParticipantsByInvitationId(invitationId) {
  const { data, error } = await supabase
    .from('participants')
    .select('profiles(id, name, family_name, avatar_url)')
    .eq('invitation_id', invitationId);


  if (error) {
    console.error("Error fetching participants:", error);
    return [];
  }

  // Validate that nested profile data exists
  const participants = data
    .map(row => row.profiles)
    .filter(profile => profile && profile.id);

  return participants;
}

// Fetch a profile by ID (uuid)
export async function getProfileById(profileId) {
  if (!profileId) {
    console.error("No profileId provided");
    return null;
  }
  const { data, error } = await supabase
    .from("profiles")
    .select("name, family_name, avatar_url, id")
    .eq("id", profileId)
    .single();
  if (error) throw new Error("Error fetching profile");
  return data;
}

// Add a participant to an invitation (client action)
export async function addParticipant(profileId, invitationId) {
  const { data: existing, error: existingError } = await supabase
    .from("participants")
    .select("id")
    .eq("user_id", profileId)
    .eq("invitation_id", invitationId)
    .maybeSingle();

  if (existingError) {
    throw new Error(`Error checking existing participant: ${existingError.message}`);
  }

  if (existing) {
    return { error: "This profile is already registered for the event." };
  }

  const { error } = await supabase
    .from("participants")
    .insert({ user_id: profileId, invitation_id: invitationId });

  if (error) throw new Error(error.message);
}

// Remove a participant from an invitation (client action)
export async function removeParticipant(profileId, invitationId) {
  const { error } = await supabase
    .from("participants")
    .delete()
    .match({ user_id: profileId, invitation_id: invitationId });
  if (error) throw new Error(error.message);
}

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

// FOUND-IT CLOSE UP PAGE
// ==============================
// Create and post a close-up+ reflection
export async function uploadCloseUpImage({ file, room }) {
  const fileExtension = file.type === "image/png" ? "png" : "jpg";
  const fileName = `${Date.now()}-${uuidv4()}.${fileExtension}`;
  const filePath = `${room}/${fileName}`;

  const { error } = await supabase.storage
    .from("abby-close-ups")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error("Supabase upload error:", error.message, error);
    throw new Error("Image upload failed");
  }
  console.log("Uploading to:", filePath);
  console.log("File type:", file.type);

  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/abby-close-ups/${filePath}`;
}

export async function insertCloseUpTicket({ room, message, imageUrl }) {
  const {data, error } = await supabase
    .from("tickets")
    .insert({
      room_id: room,
      reflection_message: message,
      image_url: imageUrl,
    })
    .select();

    if (error) {
      console.error("Insert error:", error.message, error.details, error.hint);
      throw new Error("Database insert failed");
    }
    return data;
}
