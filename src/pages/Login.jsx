import React, { useState } from 'react'
import style from '../css/Login.module.css'
import Signup from './Signup'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import ChatRoom from './ChatRoom';




function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const userLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        alert('Login Sucessfull')
        navigate('/ChatRoom')
        const user = userCredential.user;
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }


  return (
    <>
      <div className={style.main}>
        <div className={style.child1}>
          <img className={style.logo} src="/logo3.png" />
          <div className={style.form} >

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

            <button onClick={userLogin} className={style.btn}>Login</button>

            <Link className={style.lnk} to={"/Signup"}>New Here? Register</Link>


          </div>

        </div>
      </div>
    </>
  )
}

export default Login