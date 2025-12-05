import { useEffect, useRef, useState } from 'react';
import PubNub from 'pubnub';
import './App.css';


function App() {
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const messageInputRef = useRef(null);
  
  const pubKey = import.meta.env.VITE_PUBLISH_KEY;
  const subKey = import.meta.env.VITE_SUBSCRIBE_KEY;
  //console.log('PubNub keys:', pubKey, subKey);
  
  const pubnubRef = useRef(
    new PubNub({
      publishKey: pubKey,
      subscribeKey: subKey,
      uuid: 'user-' + Math.floor(Math.random() * 1000),
    })
  );

  useEffect(() => {
  const pubnub = pubnubRef.current;

  // Define listener separately so it can be removed
  const messageListener = {
    message: function (event) {
      const msg = event.message.text;
      setMessages(prev => [...prev, msg]);
    },
  };

  pubnub.addListener(messageListener);

  if (currentRoom) {
    pubnub.subscribe({ channels: [currentRoom] });
  }

  // Cleanup
  return () => {
    pubnub.removeListener(messageListener); // ✅ this prevents duplicate listeners
    if (currentRoom) {
      pubnub.unsubscribe({ channels: [currentRoom] });
    }
  };
}, [currentRoom]);


  function switchRoom(roomName) {
    const pubnub = pubnubRef.current;
    if (currentRoom) pubnub.unsubscribe({ channels: [currentRoom] });

    setCurrentRoom(roomName);
    setMessages([]);
    pubnub.subscribe({ channels: [roomName] });
  }

  function sendMessage() {
    const text = messageInputRef.current.value;
    if (!text || !currentRoom) return;

    pubnubRef.current.publish({
      channel: currentRoom,
      message: { text },
    });

    messageInputRef.current.value = '';
  }

  return (
    <div className="App">
      <h1>PubNub Chatrooms</h1>

      <div>
        <button onClick={() => switchRoom('room-a')}>Room A</button>
        <button onClick={() => switchRoom('room-b')}>Room B</button>
      </div>

      <p>Current Room: <strong>{currentRoom || 'None'}</strong></p>

      <div style={{ border: '1px solid #ccc', height: '200px', overflow: 'auto', padding: '10px', margin: '10px 0' }}>
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>

      <input type="text" ref={messageInputRef} placeholder="Type a message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
