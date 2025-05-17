import React, { useState, useEffect } from 'react';
import style from '../css/ChatRoom.module.css';
import UserList from './UserList';
import ChatWindow from './ChatWindow';
import { auth, db } from './Firebase';
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
                        setCurrentUserName(data.name);
                    } else {
                        setCurrentUserName(user.email);
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
        <>
            <div className={style.chatRoomContainer}>
                <div className={style.header}>
                    {/* Show Back button only when chat window is open */}
                    {selectedUser && (
                        <button className={style.toggleButton} onClick={() => setSelectedUser(null)}>
                            ← Back
                        </button>
                    )}
                    <div className={style.greeting}>Hi {currentUserName}</div>
                    {/* <h2 className={style.title}>Welcome to Connexa</h2> */}
                    <button className={style.logoutButton} onClick={() => auth.signOut()}>
                        Logout
                    </button>
                </div>

                <div className={style.parent}>
                    {/* Show UserList only if no user is selected */}
                    {!selectedUser && (
                        <div className={`${style.child1} ${style.fullScreen}`}>
                            <UserList onSelectUser={setSelectedUser} currentUserId={currentUser.uid} />
                        </div>
                    )}

                    {/* Show ChatWindow only if a user is selected */}
                    {selectedUser && (
                        <div className={`${style.child2} ${style.fullScreen}`}>
                            <ChatWindow selectedUser={selectedUser} currentUser={currentUser} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ChatRoom;
