import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { DataContext } from "../../utils/context/DataProvider"
import { Link } from "react-router-dom"
import { NotificationsContext } from "../../utils/context/NotificationsProvider"
import { MdOutlineNotifications } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"



const Navbar = () => {
    const { account } = useContext(DataContext)
    const [display,setDisplay] = useState("none")
    const { notifications, getNotifications, deleteNotification } = useContext(NotificationsContext)

    console.log(notifications);

    const handleNotificationClick = ()=>{
        setDisplay("block")
       getNotifications()
    }
    const handleOnHover = ()=>{
        getNotifications()
        setDisplay("block")
    }
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

                {account.name !== "" ? <Link to="/applications" className="nav-links">
                    APPLICATIONS
                </Link> :
                    <Link to="/signup" className="nav-links">SIGNUP</Link>}

                {account.name !== "" && 
                <Link className="nav-links dropdown notification-icon-container" onClick={handleNotificationClick}>
                    <div className="notification-count"><span style={{color:"#fff"}}>{notifications.length}</span></div>
                    <MdOutlineNotifications className="notification-icon" onMouseEnter={handleOnHover} />
                
                   

                    <ul className="dropdown-ul" style={{display:display}} onMouseEnter={()=>setDisplay("block")} onMouseLeave={()=>setDisplay("none")}>
                        {notifications.length === 0 ? <div className="no-notifications">No Notifications</div> :
                            notifications && notifications.length > 0 && notifications.map(notification =>
                                <div className="notification"><li className="dropdown-li"><div className="notification-title"><Link className="notification-delete-btn" onClick={() => deleteNotification(notification._id)}><RiDeleteBin6Line style={{ color: "#fff" }} className="delete-notification-icon" /></Link>{notification.title}</div>
                                </li>
                                    <span className="notification-time">{notification.time}</span>
                                </div>)}
                    </ul>
                </Link>
                }

            </div>
        </nav>
    )
}

export default Navbar