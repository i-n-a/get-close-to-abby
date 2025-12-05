import "./ChatBox.css";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  TimetokenUtils
} from "@pubnub/chat";
import {
  initChat,
  prepareUsers,
  createGroupChat,
  fetchUsers
} from '../../services/pubnub';
import iconMore from "../../assets/images/svg/icon_more.svg";
import GroupChatMembersPopUp from "../PopUp/GroupChatMembersPopUp.jsx";
import { getRandomFallbackUser } from "../../utils/demoUsers";



export default function ChatBox({profile, invitationId, invitationToken, registeredParticipants, onLeave}) {
  const [chat, setChat] = useState(null);
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("Send message");
  const [showGroupChatMembers, setShowGroupChatMembers] = useState(false);

  const messageListRef = useRef(null);

  async function handleSend(event) {
    event.preventDefault();
    if (!text.trim() || !channel) return;
    await channel.sendText(text);
    setText("");
  }

  function handleTypingSignal() {
    if (!channel) return;

    channel.startTyping().catch((err) => {
      console.error("Failed to start typing:", err);
    });
  }


useEffect(() => {
  if (!channel) return;
  let isMounted = true;

  // Fetch message history
    async function loadHistory() {
    try {
      const { messages } = await channel.getHistory({ count: 50 });
      if (isMounted) setMessages(messages);
    } catch (err) {
      console.error("Failed to load PubNub history:", err);
    }
  }
  loadHistory();

  // Subscribe to messages
   const unsubscribeMessages = channel.connect((message) => {
    if (isMounted) {
      setMessages((prev) => [...prev, message]);
    }
  });

  // Subscribe to typing events - checking for multiple users typing
  const unsubscribeTyping = channel.getTyping((typingUserIds) => {
  if (!profile || !users || users.length === 0) {
    setTyping("Someone is typing...");
    return;
  }

  const otherTypingUserIds = typingUserIds.filter(id => id !== profile.id);

  if (otherTypingUserIds.length === 0) {
      setTyping("Send a message");
      return;
    }

    const names = otherTypingUserIds.map((id) => {
      const user = users.find((u) => u.id === id);
      return user?.data?.name || "Someone";
    });

    if (names.length === 1) {
      setTyping(`${names[0]} is typing...`);
    } else if (names.length === 2) {
      setTyping(`${names[0]} and ${names[1]} are typing...`);
    } else {
      setTyping(`${names[0]}, ${names[1]}, and others are typing...`);
    }
  });


  return () => {
    isMounted = false;
    console.log("Cleaning up chat component for new channel...");
    try {
      console.log("Unsubscribing messages...");
      unsubscribeMessages?.();
      console.log("Unsubscribing typing...");
      unsubscribeTyping?.();
    } catch (err) {
      console.warn("Error while unsubscribing:", err);
    }

    try {
      console.log("Disconnecting channel...");
      channel?.disconnect?.();
    } catch (err) {
      console.warn("Error disconnecting channel:", err);
    }

    try {
      console.log("Disconnecting chat...");
      chat?.disconnect?.();
    } catch (err) {
      console.warn("Error disconnecting chat:", err);
    }
    console.log("Chat component cleaned up.");
  };
  }, [channel, users, profile?.id]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    async function setup() {
      const currentUserData = profile
        ? {
            id: profile.id,
            data: {
              name: profile.name,
              custom: {
                avatar: profile.avatar_url,
                initials: profile.name?.[0]?.toUpperCase() ?? "U",
              },
            },
          }
        : getRandomFallbackUser();

      try {
        const chatInstance = await initChat(currentUserData.id, currentUserData.data);
        const otherUsers = await prepareUsers(chatInstance, registeredParticipants, currentUserData.id);
        const channelId = `invitation-${invitationToken}`;
        const groupChannel = await createGroupChat(chatInstance, otherUsers, channelId, invitationId, invitationToken);
        const pubnubClient = chatInstance.sdk;

        if (!pubnubClient || !pubnubClient.objects) {
          console.error("PubNub client or objects API not found");
          return;
        }

        try {
          await pubnubClient.objects.getChannelMetadata({ channel: channelId });
        } catch (err) {
          console.error("Failed to fetch channel metadata:", err);
        }

        const userIds = registeredParticipants.map(p => p.id);
        const userList = await fetchUsers(chatInstance, userIds);

        setChat(chatInstance);
        setChannel(groupChannel);
        setUsers(userList);
      } catch (err) {
        console.error("❌ Chat setup failed:", err);
      }
    }

    setup();
  }, []);

    const renderMessagePart = useCallback((part) => {
    if (part.type === "text") {
      return part.content.text;
    }
    if (part.type === "plainLink") {
      return <a href={part.content.link}>{part.content.link}</a>;
    }
    if (part.type === "textLink") {
      return <a href={part.content.link}>{part.content.text}</a>;
    }
    if (part.type === "mention") {
      return <a href={`https://pubnub.com/${part.content.id}`}>{part.content.name}</a>;
    }
    return "";
  }, []);

  if (!chat || !channel) return <p>Loading...</p>;
;
  const handleClick = () => {
    setShowGroupChatMembers(true);
  }

  const handleGoBackToChatPage = () => {
    setShowGroupChatMembers(false);
  };

  let lastDate = null;
  return (
    <section className="chat-container">
      {/* Chat Header */}
      <header className="chat-header">
        <div>
          <aside className="message-avatar">
              <img src={`${profile.avatar_url}`} alt={profile.name ?? "User"} className="avatar-img" />
          </aside>
          <div className="message-personal-info">
            <h3 className="message-personal-info__name bodyM">{`${profile.name} ${profile.family_name ? ` ${profile.family_name}` : ""}`}</h3>
            <h3 className="message-personal-info__count labelS">{`${registeredParticipants.length} people joined`}</h3>
          </div>
        </div>
        <button onClick={handleClick}><img src={iconMore} alt="More options"/></button>
      </header>

      {/* Group Chat Members PopUp */}
      {showGroupChatMembers && (
        <GroupChatMembersPopUp
          onLeave={onLeave}
          registeredParticipants={registeredParticipants}
          onGoBack={handleGoBackToChatPage}
        />
      )}

      {/* Chat Messages */}
      <section className="message-list" ref={messageListRef}>
        <ol className="messages">
          {messages.map((msg) => {
            const user = users.find((u) => u.id === msg.userId);
            const messageDate = TimetokenUtils
              .timetokenToDate(msg.timetoken)
              .toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

            const showDateDivider = messageDate !== lastDate;
            lastDate = messageDate;

            return (
              <div key={msg.timetoken}>
                {showDateDivider && (
                  <div className="date-divider">{messageDate}</div>
                )}

                <li className="message">
                  <aside className="message-avatar message-avatar--left">
                    {user?.custom?.avatar?.startsWith?.("http") ? (
                      <img src={user.custom.avatar} alt={user?.name ?? "User"} className="avatar-img" />
                    ) : user?.custom ? (
                      <div style={{ background: user.custom.avatar }} className="avatar-fallback">
                        {user.custom.initials}
                      </div>
                    ) : (
                      <div className="avatar-fallback">?</div>
                    )}
                  </aside>
                  <div className="message-info">
                    <article className="message-content">
                    <h3 className="message-content__name labelS bold">
                      {user?.name}
                    </h3>
                    <p>
                      {msg.getLinkedText?.() ? (
                        msg.getLinkedText().map((part, i) => (
                          <span key={i}>{renderMessagePart(part)}</span>
                        ))
                      ) : (
                        <span className="unsupported-message">[Unsupported message type]</span>
                      )}
                    </p>
                  </article>
                  <time className="message-time">
                        {TimetokenUtils
                          .timetokenToDate(msg.timetoken)
                          .toLocaleTimeString([], { timeStyle: "short" })}
                      </time>
                  </div>

                </li>
              </div>
            );
          })}
        </ol>
      </section>

      <form className="message-input" onSubmit={handleSend}>
        <input
          className="message-input__field"
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            handleTypingSignal();
          }}
          placeholder={typing}
          disabled={!chat || !channel}
        />

        <input
          type="submit"
          value="➔"
          onClick={handleSend}
        />
      </form>
    </section>
  );
}
