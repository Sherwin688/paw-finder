import React from 'react'
import { Link } from "react-router-dom"
import "./Post.css"
import { CgProfile } from "react-icons/cg"

const Post = ({ post }) => {
  return (
    <Link to={`/post/${post._id}`} >
      <div className="post-card">

        <div className="post-card-img">
          <img src={post.images[0]} loading="lazy" alt="" />
        </div>
        <div className="post-card-content">
          <p style={{ padding: "0 5px", textAlign: "right" }}><span className="home-status" style={{ color: "#000" }}>Status:
          </span>
            <span className="home-status" style={{ backgroundColor: post.status === "Available" ? "#50C878" : "#f76f6f", color: "#fff" }}>{post.status}</span></p>
          <div className="post-card-content-inner">
            <div className="post-inner-info">
              <h1 style={{lineHeight:"22px"}}>{post.title.length > 30 ? post.title.substring(0, 30) + "..." : post.title}</h1>
              <p style={{lineHeight:"15px",color:"#666666"}}>{post.description.length > 50 ? post.description.substring(0, 50) + "..." : post.description}</p>
            </div>
            <div className="post-owner">
              <div className="small-profile-container" style={{ fontWeight: 600, color: "#000", justifyContent: "flex-end", fontSize: 12 }}><p className="small-profile-content"><CgProfile style={{ fontSize: 20, margin: "0 5px" }} />{post.user_name}</p></div>

              {/* <p>post by : {post.user_name}</p> */}
            </div>
          </div>
        </div>

      </div>
    </Link>
  )
}

export default Post