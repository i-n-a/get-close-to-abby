import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Chat, TimetokenUtils } from "@pubnub/chat";
import { createClient } from "@supabase/supabase-js";
import "./ChatBox.css";

// Supabase client
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

// Helper: initials from name
const getInitials = (name = "") => name.split(" ").map(n => n[0]).join("").toUpperCase();

export default function ChatBox() {
  const { openId } = useParams(); // this is the event ID (205, etc.)
  const [chat, setChat] = useState(null);
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);

  async function handleSend(event) {
    event.preventDefault();
    if (!text || !channel) return;
    await channel.sendText(text);
    setText("");
  }

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!channel) return;
    return channel.connect((message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [channel]);

  useEffect(() => {
    async function initializeChat() {
      try {
        // Step 1: Authenticated user
        const { data: session } = await supabase.auth.getSession();
        const userId = session?.session?.user?.id;
        if (!userId) throw new Error("User not logged in");

        // Step 2: Fetch profile from Supabase
        const { data: profile } = await supabase
          .from("profiles")
          .select("name, avatar_url")
          .eq("id", userId)
          .single();

        const pubnubUser = {
          id: userId,
          data: {
            name: profile?.name || "Unknown User",
            custom: {
              initials: getInitials(profile?.name || ""),
              avatar: profile?.avatar_url || "#ccc"
            }
          }
        };

        // Step 3: Init PubNub chat instance
        const chatInstance = await Chat.init({
          publishKey: import.meta.env.VITE_PUBNUB_PUB_KEY,
          subscribeKey: import.meta.env.VITE_PUBNUB_SUB_KEY,
          userId: pubnubUser.id
        });

        await chatInstance.currentUser.update(pubnubUser.data);

        // Step 4: Join or create event chatroom
        const eventChannelId = `chat-${openId}`;
        const { channel } = await chatInstance.createConversation({
          id: eventChannelId,
          channelData: { name: `Open Invitation #${openId}` }
        });

        await channel.update({ name: `Open Invitation #${openId}` });

        // Step 5: Fetch participant metadata (optional)
        const participantIds = [userId]; // could also query Supabase for more
        const resolvedUsers = await Promise.all(
          participantIds.map(async (pid) => {
            try {
              const user = await chatInstance.getUser(pid);
              return user;
            } catch {
              return {
                id: pid,
                name: "Unknown",
                custom: { initials: "?", avatar: "#eee" }
              };
            }
          })
        );

        setChat(chatInstance);
        setChannel(channel);
        setUsers(resolvedUsers);
      } catch (err) {
        console.error("Chat init failed:", err.message);
      }
    }

    initializeChat();
  }, [openId]);

  const renderMessagePart = useCallback((part) => {
    switch (part.type) {
      case "text": return part.content.text;
      case "plainLink": return <a href={part.content.link}>{part.content.link}</a>;
      case "textLink": return <a href={part.content.link}>{part.content.text}</a>;
      case "mention": return <a href={`https://pubnub.com/${part.content.id}`}>{part.content.name}</a>;
      default: return "";
    }
  }, []);

  if (!chat || !channel) return <p>Loading chat...</p>;

  return (
    <section className="chat-container">
      <header className="chat-header">
        <h3>{channel.name}</h3>
        <h3>{chat.currentUser.name}</h3>
      </header>

      <section className="message-list" ref={messageListRef}>
        <ol className="messages">
          {messages.map((msg) => {
            const user = users.find((u) => u.id === msg.userId);
            return (
              <li className="message" key={msg.timetoken}>
                <aside className="message-avatar" style={{ background: String(user?.custom?.avatar) }}>
                  {user?.custom?.initials}
                </aside>
                <article>
                  <h3>
                    {user?.name}
                    <time className="message-time">
                      {TimetokenUtils.timetokenToDate(msg.timetoken).toLocaleTimeString([], { timeStyle: "short" })}
                    </time>
                  </h3>
                  <p>{msg.getLinkedText().map((part, i) => <span key={i}>{renderMessagePart(part)}</span>)}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </section>

      <form className="message-input" onSubmit={handleSend}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Send message"
        />
        <input
          type="submit"
          value="➔"
          disabled={!text}
          style={{ color: text ? "#de2440" : "#aaa" }}
        />
      </form>
    </section>
  );
}
