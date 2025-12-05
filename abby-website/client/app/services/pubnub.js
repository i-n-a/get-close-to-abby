import { Chat} from "@pubnub/chat";
const pubKey = import.meta.env.VITE_PUBNUB_PUBLISH_KEY;
const subKey = import.meta.env.VITE_PUBNUB_SUBSCRIBE_KEY;

if (!pubKey || !subKey) {
  console.error("Missing PubNub env vars:", { pubKey, subKey });
  throw new Error("PubNub keys are not defined. Check your environment variables.");
}


export async function initChat(userId, userData) {
  const chatInstance = await Chat.init({
    publishKey: pubKey,
    subscribeKey: subKey,
    userId,
    presence: true,
  });

  await chatInstance.currentUser.update(userData);
  return chatInstance;
}

// Defensive prepareUsers to avoid undefined errors and catch PubNub validation issues
export async function prepareUsers(chat, participants, currentUserId) {
  const participantUserObjects = participants
    .map((row, i) => {
      if (!row || !row.id || !row.name) {
        console.warn(`⚠️ Invalid participant row at index ${i}:`, row);
        return null;
      }

      const userObject = {
        id: row.id,
        data: {
          name: row.name,
          custom: {
            avatar: row.avatar_url ?? "", // Avoid null — use empty string
            initials: row.name?.[0]?.toUpperCase() || "U",
          },
        },
      };

      //console.log(`✅ Prepared user ${i}:`, userObject);
      return userObject;
    })
    .filter(Boolean);



  if (participantUserObjects.length === 0) {
    throw new Error("No valid participants to prepare");
  }
  // participantUserObjects.forEach(user => {
  //   console.log("Creating PubNub user:", user.id, user.data);
  // });

  const otherUsers = await Promise.all(
  participantUserObjects
    .filter((u) => u.id !== currentUserId)
    .map(async (user) => {
      try {
        const existing = await chat.getUser(user.id);
        return existing || (await chat.createUser(user.id, user.data));
      } catch (err) {
        console.error(`❌ PubNub user creation failed for ${user.id}:`, err);
        return null;
      }

    })
  );

  // participants.forEach((p, i) => {
  //   console.log(`[${i}] Participant ID:`, p?.id, '| Name:', p?.name, '| Avatar:', p?.avatar_url);
  // });

  const validUsers = otherUsers.filter(Boolean);

  if (validUsers.length !== otherUsers.length) {
    throw new Error("One or more users failed to initialize due to validation errors.");
  }

  return validUsers;
}



export async function createGroupChat(chat, users, channelId, invitationId, invitationToken) {
  const expectedName = `Open Invitation #${invitationToken}`;

  try {
    // Check if channel already exists - optional, based on SDK support
    // Or just create/join and rely on SDK to handle it

    const { channel } = await chat.createGroupConversation({
      users,
      channelId,
      channelData: { name: expectedName },
      membershipData: {
        custom: {
          purpose: `participant in open invitation #${invitationId}`,
        },
      },
    });

    // Wait a bit to allow metadata propagation (optional)
    //await new Promise(res => setTimeout(res, 100));

    // Check for name mismatch & update if needed
    const actualName = channel.channelData?.name;
    if (actualName !== expectedName) {
      //console.warn(`Channel name mismatch. Updating...`);
      await channel.update({ name: expectedName });
    }

    //console.log("Final channel name:", channel.name, "channel id:", channel.id);
    return channel;
  } catch (err) {
    console.error("Failed to create or update group chat:", err);
    throw err;  // rethrow to handle upstream
  }
}

export async function fetchUsers(chat, userIds) {
  const users = await Promise.all(
    userIds.map(async (id) => {
      try {
        const user = await chat.getUser(id);
        return {
          id: user.id,
          name: user.name,
          custom: user.custom ?? {}, // Ensure custom exists
          ...user.data, // Keep other user.data if needed
        };
      } catch (err) {
        console.warn(`User ${id} not found in chat`, err);
        return null;
      }
    })
  );
  return users.filter(Boolean);
}

