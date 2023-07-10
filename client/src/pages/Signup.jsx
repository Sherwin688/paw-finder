import React, { useState } from 'react'
import "./form.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { getURL } from "../utils/ApiHelper"
import "./Signup.css"

const Signup = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [otpModal, setOtpModal] = useState(false)
    const [otp, setOtp] = useState("")
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        //api call
        await axios.post(`${getURL}/signup/generateOtp`, { name, phone, password })
            .then(res => {
                if (res.status === 200) {
                    // navigate("/login")
                    // console.log(res);
                    setOtpModal(true)
                }
                else {
                    navigate("/signup")
                }
            })
    }
    const handleOtpVerify = async(e)=>{
        e.preventDefault()
        await axios.post(`${getURL}/signup/verifyOtp`, {otp})
        .then(res => {
            if (res.status === 200) {
                setOtpModal(false)
                navigate("/login")
                console.log(res);
            }
            else {
                navigate("/signup")
            }
        })
    }
    console.log(otp);
    return (
        <div className="form-container">
            {otpModal && 
            
            <div className="signup-modal">
          <div className="signup-modal-content">
            {/* <div className="close-icon" onClick={() => setShowAdoptModal(false)}><AiOutlineClose/></div> */}
            <form onSubmit={handleOtpVerify}>
              <h2 style={{ textAlign: "center" }}>Verify OTP</h2>
              <div className="form-group">
                <label htmlFor="otp">Enter OTP</label>
                <input type="text" name="otp" id="otp" onChange={(e)=>setOtp(e.target.value)} />
              </div>
           

              <button type="submit" className="create-post-btn">verify</button>
            </form>
          </div>
        </div>
            
            }
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