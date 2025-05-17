import React, { useEffect, useState, useRef } from 'react';
import {
  collection,
  query,
  orderBy,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './Firebase';
import style from '../css/ChatWindow.module.css';

function ChatWindow({ selectedUser, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messageEndRef = useRef(null);

  // Create a unique chat ID by combining both users' IDs
  const chatId = [currentUser.uid, selectedUser.id].sort().join('_');

  // Fetch messages in real-time when chatId changes
  useEffect(() => {
    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('timestamp')
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      const msgs = snapshot.docs.map(doc => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, [chatId]);

  // Auto scroll to the newest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a new message
  const sendMessage = async () => {
    if (input.trim() === '') return;

    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      senderId: currentUser.uid,
      text: input,
      timestamp: serverTimestamp(),
    });

    setInput(''); // Clear input after sending
  };

  // Format timestamp into readable HH:MM format
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className={style.parent}>
      <div className={style.chatContainer}>
        {/* Chat header */}
        <div className={style.header}>Chat with {selectedUser.name}</div>

        {/* Message area */}
        <div className={style.messages}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`${style.message} ${msg.senderId === currentUser.uid ? style.sent : style.received}`}
            >
              <span className={style.text}>{msg.text}</span>
              <span className={style.time}>{formatTime(msg.timestamp)}</span>
            </div>
          ))}
          <div ref={messageEndRef}></div>
        </div>

        {/* Input bar */}
        <div className={style.inputBar}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className={style.input}
          />
          <button onClick={sendMessage} className={style.sendBtn}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
