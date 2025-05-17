import React, { useState } from 'react'
import style from '../css/Signup.module.css'
import Login from './Login'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './Firebase';
import { Navigate } from 'react-router-dom';

function Signup() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const signupUser = async () => {
        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        // Strong email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Strong password requirements
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
        if (!strongPasswordRegex.test(password)) {
            alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                password: password
            });

            alert("Signup successful! now You Can Login!");

            navigate('/Login')

            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            alert("Signup failed: " + error.message);
        }
    };

    return (
        <>
            <div className={style.main}>
                <div className={style.child1}>
                    <img className={style.logo} src="/logo3.png" />
                    <div className={style.form} >

                        <div className={style.name}>
                            <label className={style.lbl}>Name</label>
                            <input className={style.inp} type="text" placeholder='Enter Your Good Name'
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>

                        <div className={style.name}>
                            <label className={style.lbl}>Email</label>
                            <input className={style.inp} type="email" placeholder='Enter Your Email'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className={style.name}>
                            <label className={style.lbl}>Password</label>
                            <input className={style.inp} type="password" placeholder='Enter Your Strong Password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <button onClick={() => signupUser()} className={style.btn}>Signup</button>
                        <Link className={style.lnk} to={"/Login"}>Already Register? Login</Link>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Signup