import React from 'react'
import { Link } from "react-router-dom"
import "./Post.css"

const Post = ({ post }) => {
  return (
    <Link to={`/post/${post._id}`} >
      <div className="post-card">

        <div className="post-card-img">
          <img src={post.images[0]} alt="" />
        </div>
        <div className="post-card-content">
      <p style={{padding:"0 5px",color:post.status==="open"?"green":"red",textAlign:"right"}}><span style={{color:"#000"}}>Status: </span> {post.status}</p> 
          <h1>{post.title}</h1>
          
    <p>{post.description}</p>
        <p>post by : {post.user_name}</p>
        <p>Status : {post.status}</p>
        </div>
      </div>
    </Link>
  )
}

export default Post