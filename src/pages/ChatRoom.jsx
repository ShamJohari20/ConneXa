import React, { useState, useEffect } from 'react';
import style from '../css/ChatRoom.module.css';
import UserList from './UserList';
import ChatWindow from './ChatWindow';
import { auth } from './Firebase';
import { db } from './Firebase';
import { doc, getDoc } from 'firebase/firestore';

function ChatRoom() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserName, setCurrentUserName] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setCurrentUser(user);
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setCurrentUserName(data.name); // ✅ use the saved name
                    } else {
                        setCurrentUserName(user.email); // fallback
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    if (!currentUser) return <p>Loading...</p>;

    return (
        <div className={style.parent}>
            <div className={style.child1}>
                <h1 className={style.hedding}>Hii {currentUserName}</h1>
                <UserList onSelectUser={setSelectedUser} currentUserId={currentUser.uid} />
            </div>

            <div className={style.child2}>
                {selectedUser ? (
                    <ChatWindow selectedUser={selectedUser} currentUser={currentUser} />
                ) : (
                    <div className={style.emptyMessage}>
                        <h2>Select a friend to Connect...💌 </h2>
                    </div>

                )}
            </div>
        </div>
    );
}

export default ChatRoom;
