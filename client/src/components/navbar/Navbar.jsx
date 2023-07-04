import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { DataContext } from "../../utils/context/DataProvider"
import { Link } from "react-router-dom"
import axios from "axios"
import { getURL } from "../../utils/ApiHelper"
import {NotificationsContext} from "../../utils/context/NotificationsProvider"



const Navbar = () => {
    // const {notifications,getNotifications} = useContext(NotificationsContext)
    const {account} = useContext(DataContext)
    const {notifications,getNotifications} = useContext(NotificationsContext)
  
    
    return (
        <nav>
            <div className="logo">
               <Link to="/"> <img id="logo" src="/images/logo.jpg" alt="logo" /></Link>
                <Link to="/" id="brand">Paw Finder</Link>
            </div>

            <div className="links">
                <Link to="/" className="nav-links">HOME</Link>
                <Link to="/about" className="nav-links">ABOUT</Link>
                <Link to="/create" className="nav-links">CREATE</Link>
                
                {account.name!==""?<Link to="/applications" className="nav-links">
                APPLICATIONS
                </Link>:
                <Link to="/signup" className="nav-links">SIGNUP</Link> }
                
                <Link className="nav-links dropdown" onClick={()=>getNotifications()}>NOTIFICATIONS
                <ul className="dropdown-ul">
                    {notifications &&notifications.length>0 && notifications.map(notification=><li className="dropdown-li">{notification.title}</li>)}
                </ul>
                </Link>
                
            </div>
        </nav>
    )
}

export default Navbar