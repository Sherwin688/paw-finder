import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from "../utils/context/DataProvider"
import axios from "axios"
import { getAccessToken } from "../utils/ApiHelper"
import "./CreatePost.css"
import { useNavigate } from "react-router-dom"
import { NotificationsContext } from "../utils/context/NotificationsProvider"
const {getURL} = require("../utils/ApiHelper")

const CreatePost = () => {
  const initialPostValues = {
    title:"",
    description:""
  }
  const {account} = useContext(DataContext)
  const [files,setFiles] = useState([{
    name: "test.jpg",        
    size: 123456,                
    type: "image/jpeg",         
    lastModified: 1630925678000 
  }])
  const [imageLinks,setImageLinks] = useState([])
  const [post,setPost] = useState(initialPostValues)
  const [imageLoading,setImageLoading] = useState(false)
  const navigate = useNavigate()
  const {getNotifications} = useContext(NotificationsContext)

 
  useEffect(()=>{
    const getImage = async () => {
      setImageLoading(true)
      if (files.length > 0) {
        const formData = new FormData();
    
        for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i]);
        }
    
        try {
          await axios.post('http://localhost:8000/file/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization':getAccessToken()
            },
          }).then(res=>{
            if(res.status===200){
              setImageLoading(false)
          setImageLinks(res.data)

            }
          });
    
        } catch (error) {
          setImageLoading(false)
          console.log('Error:', error);
        }
      }
    };
    getImage()
  },[files])
  const handleSubmit = async(e)=>{
    e.preventDefault()
    axios.post(`${getURL}/create`,{...post,imageLinks,user_name:account.name,user_phone:account.phone},{headers:{
      "Authorization": getAccessToken(),
    }}).then(res=>{
      console.log(res.data);
      navigate(`/post/${res.data.id}`)
      getNotifications()
    })
  }

  const handleInputChange = (e) =>{
    setPost({...post,[e.target.name]:e.target.value})
  }
  return (
    <div className="form-container">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="create-form-group">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" onChange={handleInputChange}/>
        </div>
        <div className="create-form-group">
        <label htmlFor="title">Description</label>
        <textarea type="text" name="description" rows={6} id="description" onChange={handleInputChange}/>
        </div>
        <div className="create-form-group">

        <label htmlFor="files">Images</label>
        <input type="file" className="files-input" onChange={(e)=>setFiles(e.target.files)} multiple  name="files" id="files" />
        </div>

    <button type="submit" disabled={imageLoading} className="create-post-btn">Create Post</button>
      </form>
    </div>
  )
}

export default CreatePost