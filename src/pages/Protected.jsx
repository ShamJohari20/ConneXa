
import React, { useEffect , useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import style from '../css/Protected.module.css'
import ChatRoom from './ChatRoom';
import { auth } from './Firebase';


function Protected({Component}) {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const auth = getAuth();

    useEffect(() => {
        const checkUser = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true)
            }
            else {
                navigate("/login")
            }
            setLoading(false)
        })
        return () => checkUser()
    }, [navigate])

    if (loading) {
        return (
            <div className={style.loading}>
                <div className={style.spinner}></div>
                <h2>Ruko Jra Sabar Karo...</h2>
            </div>
        )
    }

    return loggedIn ? <Component /> : null;

}

export default Protected