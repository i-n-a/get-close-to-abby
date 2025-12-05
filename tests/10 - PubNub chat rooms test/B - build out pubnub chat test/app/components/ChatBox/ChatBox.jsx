// 3. Test Code Snippet - setting up PubNub chat rooms without @chatscope/chat-ui-kit-react but no username or avatar
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Chat,
  TimetokenUtils
} from "@pubnub/chat";
import "./ChatBox.css"; // Assuming you have a CSS file for styles

const userData = [
  {
    id: "support-agent",
    data: { name: "John (Support Agent)", custom: { initials: "SA", avatar: "#9fa7df" } },
  },
  {
    id: "supported-user",
    data: { name: "Mary Watson", custom: { initials: "MW", avatar: "#ffab91" } },
  },
];

const randomizedUsers = Math.random() < 0.5 ? userData : userData.reverse();

export default function ChatBox() {
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
      const chatInstance = await Chat.init({
        publishKey: import.meta.env.VITE_PUBNUB_PUB_KEY,
        subscribeKey: import.meta.env.VITE_PUBNUB_SUB_KEY,
        userId: randomizedUsers[0].id,
      });

      const currentUser = await chatInstance.currentUser.update(randomizedUsers[0].data);

      const interlocutor =
        (await chatInstance.getUser(randomizedUsers[1].id)) ||
        (await chatInstance.createUser(randomizedUsers[1].id, randomizedUsers[1].data));

      const { channel } = await chatInstance.createDirectConversation({
        user: interlocutor,
        channelData: { name: "Open Invitation #205" },
      });

      // Explicitly set channel metadata
      await channel.update({ name: "Open Invitation #205" });

      setChat(chatInstance);
      setUsers([currentUser, interlocutor]);
      setChannel(channel);

    }

    initializeChat();
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

  //console.log("Created channel:", channel);

  return (
    <section className="chat-container">
      {/* Chat Header */}
      <header className="chat-header">
        <h3>{channel.name}</h3>
        <h3>{chat.currentUser.name}</h3>
      </header>

      {/* Chat Messages */}
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
                      {TimetokenUtils
                        .timetokenToDate(msg.timetoken)
                        .toLocaleTimeString([], { timeStyle: "short" })}
                    </time>
                  </h3>
                  <p>
                    {msg.getLinkedText().map((part, i) => (
                      <span key={i}>{renderMessagePart(part)}</span>
                    ))}
                  </p>
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
          onClick={handleSend}
          style={{ color: text ? "#de2440" : "#aaa" }}
        />
      </form>
    </section>
  );
}


// 2. Test Code Snippet - setting up PubNub chat rooms with @chatscope/chat-ui-kit-react but no username or avatar

// import { useEffect, useState, useRef } from "react";
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
// } from "@chatscope/chat-ui-kit-react";
// import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
// import { Chat, Channel, Message as PubNubMessage, User } from "@pubnub/chat";
// const pubKey = import.meta.env.VITE_PUBLISH_KEY;
// const subKey = import.meta.env.VITE_SUBSCRIBE_KEY;
// //console.log('PubNub keys:', pubKey, subKey);

// const userData = [
//   {
//     id: "support-agent",
//     data: { name: "John (Support Agent)", custom: { initials: "SA", avatar: "#9fa7df" } },
//   },
//   {
//     id: "supported-user",
//     data: { name: "Mary Watson", custom: { initials: "MW", avatar: "#ffab91" } },
//   },
// ];

// const randomizedUsers = Math.random() < 0.5 ? userData : userData.reverse();

// export default function ChatBox() {
//   const [chat, setChat] = useState(null);
//   const [channel, setChannel] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [text, setText] = useState("");
//   const messageListRef = useRef(null);

//   // Initialize Chat SDK and conversation
//   useEffect(() => {
//     async function initialize() {
//       const chatInstance = await Chat.init({
//         publishKey: pubKey,
//         subscribeKey: subKey,
//         userId: randomizedUsers[0].id,
//         // a random user ID for the current user will be generated
//       });
//       console.log(randomizedUsers[0].id);
//       // const chat = Chat.init({
//       //   publishKey: pubKey,
//       //   subscribeKey: subKey,
//       //   userId: "user-" + Math.random().toString(16).slice(2),
//       //   typingTimeout: 3000,
//       //   rateLimitPerChannel: { public: 1000 },
//       //   rateLimitFactor: 2
//       // });
//       const currentUser = await chatInstance.currentUser.update(randomizedUsers[0].data);
//       const interlocutor =
//         (await chatInstance.getUser(randomizedUsers[1].id)) ||
//         (await chatInstance.createUser(randomizedUsers[1].id, randomizedUsers[1].data));

//       const { channel } = await chatInstance.createDirectConversation({
//         user: interlocutor,
//         channelData: { name: "Support Channel" },
//       });

//       setChat(chatInstance);
//       setUsers([currentUser, interlocutor]);
//       setChannel(channel);

//       // Connect and listen for messages
//       channel.connect((newMessage) => {
//         setMessages((msgs) => [...msgs, newMessage]);
//       });
//     }

//     initialize();
//   }, []);

//   // Scroll to bottom on new message
//   useEffect(() => {
//     if (messageListRef.current) {
//       messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Send message handler
//   const handleSend = async (msg) => {
//     if (!channel) return;
//     await channel.sendText(msg);
//     setText("");
//   };


//   return (
//     <div className="chat-container" style={{ height: "500px", display: "flex", flexDirection: "column" }}>
//       <MainContainer>
//         <ChatContainer>
//           <MessageList ref={messageListRef}>
//             {messages.map((msg) => {
//               const sender = users.find((u) => u.id === msg.userId);
//               return (
//                 <Message
//                   key={msg.timetoken}
//                   model={{
//                     message: msg.getLinkedText().map((part) => part.content?.text || "").join(" "),
//                     sender: sender?.name || "Unknown",
//                     sentTime: new Date(msg.timetoken / 10000).toLocaleTimeString([], { timeStyle: "short" }),
//                     direction: msg.userId === chat?.currentUser.id ? "outgoing" : "incoming",
//                   }}
//                 />
//               );
//             })}
//           </MessageList>
//           <MessageInput
//             placeholder="Type message here"
//             value={text}
//             onChange={(val) => setText(val)}
//             onSend={handleSend}
//           />
//         </ChatContainer>
//       </MainContainer>
//     </div>
//   );
// }

// 1. Test Code Snippet - setting up a basic chat box with @chatscope/chat-ui-kit-react

// import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

// export default function ChatBox() {
//     const handleClick = () => {
//         alert(`
//         Public Chat Notice
//         This chat is visible to other visitors. Please be 
//         mindful of the information you share, and 
//         respect others at all times. Disrespectful or 
//         inappropriate messages will be removed.`);
//     };
//   return (
//     <div className="chat-container">
//       <header className="chat-header ">
//         <div className="flex row justify-between items-center">
//           <h1 className="font-medium">Want to chat with others?</h1>
//           <button onClick={handleClick}className="text-sm">ℹ️</button>
//         </div>
//         <p>You can chat here with the other people who are signed up to this event. Get organised, inspired or creative!</p>
//       </header>
//       <section className="chat-main" style={{ position:"relative", height: "500px"}}>
//         <MainContainer>
//             <ChatContainer>       
//                 <MessageList>
//                     <Message model={{
//                         message: "Hello my friend",
//                         sentTime: "just now",
//                         sender: "Joe"
//                         }} />
//                 </MessageList>
//                 <MessageInput placeholder="Type message here" />        
//             </ChatContainer>
//         </MainContainer>
//       </section>
//     </div>
//   );
// }