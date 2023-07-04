import React, { useState } from 'react'
import "./form.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { getURL } from "../utils/ApiHelper"

const Signup = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        //api call
        await axios.post(`${getURL}/signup`, { name, phone, password })
            .then(res => {
                if (res.status === 200) {
                    navigate("/login")
                    console.log(res);
                }
                else {
                    navigate("/signup")
                }
            })
    }
    return (
        <div className="form-container">
            <form>
                <h1>Signup</h1>
                <div className="form-group">
                    <label htmlFor="phone">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input type="text" id="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <button type="submit" className="signup-btn" onClick={(e) => handleSignup(e)}>Signup</button>
                </div>

                <div className="form-group" style={{ textAlign: "center" }}>
                    Already have an Account?
                    <a href="/login" style={{ textDecoration: "none", fontWeight: 600, fontSize: 20, color: "#000" }}>Login</a>
                </div>
            </form>
        </div>
    )
}

export default Signup