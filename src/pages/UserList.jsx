import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import style from '../css/UserList.module.css'; // 🔄 CSS Module
import { db } from './Firebase';

function UserList({ onSelectUser, currentUserId }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const userList = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(user => user.id !== currentUserId); // Exclude self
            setUsers(userList);
        };

        fetchUsers();
    }, [currentUserId]);

    return (
        <>
            <div className={style.parent}>
                <div className={style.userList}>
                    <h2 className={style.title}>Friends</h2>
                    <ul className={style.list}>
                        {users.map(user => (
                            <li key={user.id} onClick={() => onSelectUser(user)} className={style.userItem}>
                                <div className={style.avatar}>
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className={style.userName}>{user.name}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default UserList;
