import React, { useState } from 'react'
import style from '../css/Signup.module.css'
import Login from './Login'
import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



function Signup() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signuuUser = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }
    return (
        <>
            <div className={style.main}>
                <div className={style.child1}>
                    <img className={style.logo} src="/logo3.png" />
                    <div className={style.form} >

                        <div className={style.name}>
                            <label className={style.lbl}>Name</label>
                            <input className={style.inp} type="text" placeholder='Enter Your Good Name' />
                        </div>

                        <div className={style.name}>
                            <label className={style.lbl}>Email</label>
                            <input className={style.inp} type="email" placeholder='Enter Your Email' />
                        </div>

                        <div className={style.name}>
                            <label className={style.lbl}>Password</label>
                            <input className={style.inp} type="password" placeholder='Enter Your Strong Password' />
                        </div>

                        <button onClick={() => signuuUser()} className={style.btn}>Login</button>
                        <Link className={style.lnk} to={"/Login"}>Already Register? Login</Link>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Signup