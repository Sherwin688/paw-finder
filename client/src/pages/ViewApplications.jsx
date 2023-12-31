import axios from "axios"
import React, { useContext, useEffect, useState } from 'react'
import { getURL } from "../utils/ApiHelper"
import "./ViewApplications.css"
import { Link } from "react-router-dom"
import { DataContext } from "../utils/context/DataProvider"

const ViewApplications = () => {
    const {account} = useContext(DataContext)
    const [applications, setApplications] = useState([])
    useEffect(() => {
        const getPost = async () => {
            axios.get(`${getURL}/applications/${account.name}`).then(res => {
                setApplications(res.data)

            }).catch(err => {
                console.log(err);
            })

        }
        getPost()
    }, [])
    return (
        <div className="applications-container">
            {applications.length===0 &&<div> <h2 style={{marginTop:"20px"}}>No Applications</h2><p>You will recieve requests here once someone is interested in your adoption post.</p></div>}
            {applications.map((application, index) => {
                return (
                    <div className="application-card" key={index}>
                        <div className="application-info">
                            
                            <p>Adoption request from <span className="bold">{application.from} </span>for <span className="bold">{application.post_title.substring(0,10)}...</span> </p>
                        </div>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Link to={`/application/${application._id}`} className="view-application-btn">View Application</Link>
                            <p style={{padding:"0 5px",color:application.status==="Accepted"?"green":application.status==="Pending"?"yellow":"red"}}><span style={{color:"#000"}}>Status: </span> {application.status}</p> 
                        </div>
                        </div>
                )
            }
            )      }
        </div>
    )
}

export default ViewApplications