import React, { useEffect, useState, useRef } from 'react';
import {
    collection,
    query,
    orderBy,
    addDoc,
    onSnapshot,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import style from '../css/ChatWindow.module.css';

function ChatWindow({ selectedUser, currentUser }) {
    const chatId = [currentUser.uid, selectedUser.id].sort().join('_');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messageEndRef = useRef(null);

    useEffect(() => {
        const q = query(
            collection(db, 'chats', chatId, 'messages'),
            orderBy('timestamp')
        );

        const unsubscribe = onSnapshot(q, snapshot => {
            const msgs = snapshot.docs.map(doc => doc.data());
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [chatId]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (input.trim() === '') return;

        await addDoc(collection(db, 'chats', chatId, 'messages'), {
            senderId: currentUser.uid,
            text: input,
            timestamp: serverTimestamp(),
        });

        setInput('');
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate();
        return `${date.getHours().toString().padStart(2, '0')}:${date
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <div className={style.chatContainer}>
            <div className={style.header}>Chat with {selectedUser.name}</div>

            <div className={style.messages}>
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`${style.message} ${
                            msg.senderId === currentUser.uid
                                ? style.sent
                                : style.received
                        }`}
                    >
                        <span className={style.text}>{msg.text}</span>
                        <span className={style.time}>
                            {formatTime(msg.timestamp)}
                        </span>
                    </div>
                ))}
                <div ref={messageEndRef}></div>
            </div>

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
    );
}

export default ChatWindow;
