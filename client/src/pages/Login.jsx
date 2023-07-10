import React, { useContext, useState } from 'react'
import "./form.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { getURL } from "../utils/ApiHelper"
import { DataContext } from "../utils/context/DataProvider"
import { NotificationsContext } from "../utils/context/NotificationsProvider"

const Login = ({setIsAuthenticated}) => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const {setAccount} = useContext(DataContext)
  const {getNotifications} = useContext(NotificationsContext)

    const handleLogin = async(e)=>{
        e.preventDefault()
        await axios.post(`${getURL}/login`, {  phone, password })
        .then(res => {
            if (res.status === 200) {
                sessionStorage.setItem("accessToken",`Bearer ${res.data.accessToken}`)
                sessionStorage.setItem("refreshToken",`Bearer ${res.data.refreshToken}`)
                
                setAccount({name:res.data.name,phone:res.data.phone})
                setIsAuthenticated(true)
                navigate("/")
                getNotifications()
            }
            else {
                navigate("/")
            }
        })
    }
    return (
        <div className="form-container">
            <form onSubmit={handleLogin}>
            <h1>Login</h1>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                <button type="submit" className="signup-btn"  onClick={handleLogin}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login