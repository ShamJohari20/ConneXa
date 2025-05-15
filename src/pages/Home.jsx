import React from 'react'
import style from '../css/Home.module.css'
import Login from './Login'
import { Link, useNavigate  } from 'react-router-dom'


function Home() {
    const navigate = useNavigate()
    const go = ()=>{
        navigate("/Login")

    }
    return (
        <>
            <div className={style.main}>
                <div className={style.parent}>
                    <div className={style.welbox}>
                        <img className={style.hlogo} src="/logo3.png" width={300} />
                        <h1>Welcome to ConneXa</h1>
                        <p>Where Every Connection Begins with a Message 💌 !</p>
                        <button className={style.cbtn} onClick={go}>Continue...</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home