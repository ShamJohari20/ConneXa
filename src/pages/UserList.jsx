import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase';
import style from '../css/UserList.module.css'; // CSS styles

function UserList({ onSelectUser, currentUserId }) {
  // State to store list of users
  const [users, setUsers] = useState([]);

  // This runs once when the component loads
  useEffect(() => {
    // Function to get users from Firestore
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'users')); // Get all users
        const userList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Remove the current logged-in user from the list
        const filteredUsers = userList.filter(user => user.id !== currentUserId);
        setUsers(filteredUsers); // Store the result in state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // Call the function
  }, [currentUserId]); // Run again if logged-in user changes

  return (
    <div className={style.parent}>
      <div className={style.userList}>
        <h2 className={style.title}>Friends</h2>
        <ul className={style.list}>
          {users.map(user => (
            <li
              key={user.id}
              className={style.userItem}
              onClick={() => onSelectUser(user)} // When user clicks on a name
            >
              <div className={style.avatar}>
                {user.name ? user.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div className={style.userName}>
                {user.name || 'Unnamed User'}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserList;
