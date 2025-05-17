import React, { useState, useEffect } from 'react';
import style from '../css/ChatRoom.module.css'; // Import CSS styles
import UserList from './UserList';              // User list component
import ChatWindow from './ChatWindow';          // Chat window component
import { auth, db } from './Firebase';          // Firebase auth & database
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions

function ChatRoom() {
    // State to store the selected user (the one you're chatting with)
    const [selectedUser, setSelectedUser] = useState(null);

    // State to store current logged-in user
    const [currentUser, setCurrentUser] = useState(null);

    // State to store current user's name
    const [currentUserName, setCurrentUserName] = useState('');

    // This runs only once when the component loads
    useEffect(() => {
        // Listen to auth state changes (login/logout)
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setCurrentUser(user); // Save logged-in user info

                try {
                    // Fetch user data from Firestore
                    const userRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setCurrentUserName(userData.name); // Set name if available
                    } else {
                        setCurrentUserName(user.email);    // Fallback to email
                    }
                } catch (error) {
                    console.error('Failed to get user data:', error);
                }
            }
        });

        // Cleanup listener when component unmounts
        return () => unsubscribe();
    }, []);

    // Show loading message while user info is not ready
    if (!currentUser) return <p>Loading...</p>;

    return (
        <div className={style.chatRoomContainer}>
            {/* Header section */}
            <div className={style.header}>
                {/* Show "Back" button only if a user is selected */}
                {selectedUser && (
                    <button className={style.toggleButton} onClick={() => setSelectedUser(null)}>
                        ← Back
                    </button>
                )}

                {/* Greet the current user */}
                <div className={style.greeting}>Hi {currentUserName}</div>

                {/* Logout button */}
                <button className={style.logoutButton} onClick={() => auth.signOut()}>
                    Logout
                </button>
            </div>

            {/* Main layout: UserList and ChatWindow */}
            <div className={style.parent}>
                {/* Show list of users if no one is selected */}
                {!selectedUser && (
                    <div className={`${style.child1} ${style.fullScreen}`}>
                        <UserList
                            onSelectUser={setSelectedUser}
                            currentUserId={currentUser.uid}
                        />
                    </div>
                )}

                {/* Show chat window when a user is selected */}
                {selectedUser && (
                    <div className={`${style.child2} ${style.fullScreen}`}>
                        <ChatWindow
                            selectedUser={selectedUser}
                            currentUser={currentUser}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatRoom;
