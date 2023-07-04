import axios from "axios"
import React, { useContext, useEffect, useState } from 'react'
import { getAccessToken, getURL } from "../utils/ApiHelper"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import "./ViewApplication.css"
import { NotificationsContext } from "../utils/context/NotificationsProvider"

const ViewApplication = () => {
  const { id } = useParams()
  const [application, setApplication] = useState([])
  const navigate = useNavigate()
  const {getNotifications} = useContext(NotificationsContext)

  useEffect(() => {
    const getPost = async () => {
      axios.get(`${getURL}/application/${id}`).then(res => {
        setApplication(res.data)

      }).catch(err => {
        console.log(err);
      })

    }
    getPost()
  }, [])
  const handleAccept = ()=>{
    axios.post(`${getURL}/application/update`,{id,status:"Accepted",post_id:application.post_id,for:application.from},{headers:{
      "Authorization": getAccessToken(),
  }})
    .then(res => {
      if(res.status===200){
        navigate(`/post/${res.data.id}`)
        getNotifications()
      }

  
    }).catch(err => {
      console.log(err);
    })
  }
  const handleDecline = ()=>{
    axios.post(`${getURL}/application/update`,{id,status:"Declined",post_id:application.post_id,for:application.from},{headers:{
      "Authorization": getAccessToken(),
  }})
    .then(res => {
      if(res.status===200){
        navigate(`/post/${res.data.id}`)
        getNotifications()
      }


  
    }).catch(err => {
      console.log(err);
    })


  }
  return (
    <div className="view-application-container">
      <div className="application">
        <table className="view-application-table">
          <tr>
            <td><span className="bold">From</span></td>
            <td>{application.name}</td>
          </tr>
          <tr>
            <td><span className="bold">Phone</span></td>
            <td>{application.phone}</td>
          </tr>
          <tr>
            <td><span className="bold">Message</span></td>
            <td>{application.message}</td>
          </tr>
          <tr>
            <td><span className="bold">Post</span></td>
            <td>{application.post_title} </td>
          </tr>
          <tr>
            <td><span className="bold">Status</span></td>
            <td>{application.status}</td>
          </tr>
          <tr>
            <td><span className="bold">Name</span></td>
            <td>{application.name}</td>
          </tr>
          <tr>
            <td><span className="bold">To</span></td>
            <td>{application.to}</td>
          </tr>
        </table>
      <p></p>
      {(application.status==="Accepted" || application.status==="Declined")?"": 
      <div className="application-btns">
      <button className="accept-btn" onClick={handleAccept}>Accept</button>
      <button className="decline-btn" onClick={handleDecline}>Decline</button>
      <Link to={`/post/${application.post_id}`} className="view-post-btn">View Post</Link>
      </div>}
      </div>
    </div>
  )
}

export default ViewApplication