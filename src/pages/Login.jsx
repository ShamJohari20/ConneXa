import React from 'react'
import style from '../css/Login.module.css'
import Signup from './Signup'
import { Link } from 'react-router-dom'

function Login() {
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

            {/* <div className={style.name}>
              <label className={style.lbl}>Email</label>
              <input className={style.inp} type="email" placeholder='Enter Your Email' />
            </div> */}

            <div className={style.name}>
              <label className={style.lbl}>Password</label>
              <input className={style.inp} type="password" placeholder='Enter Your Strong Password' />
            </div>

            <button className={style.btn}>Login</button>

            <Link className={style.lnk} to={"/Signup"}>New Here? Register</Link>


          </div>

        </div>
      </div>
    </>
  )
}

export default Login