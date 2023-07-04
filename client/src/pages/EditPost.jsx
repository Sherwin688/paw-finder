import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from "../utils/context/DataProvider"
import axios from "axios"
import { getAccessToken } from "../utils/ApiHelper"
import "./CreatePost.css"
import { useNavigate, useParams } from "react-router-dom"
const {getURL} = require("../utils/ApiHelper")

const EditPost = () => {
  const {id} = useParams()
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
const navigate = useNavigate()
  useEffect(() => {
    const getPost = async () => {
      axios.get(`${getURL}/post/${id}`).then(res => {
        setPost(res.data)

      }).catch(err => {
        console.log(err);
      })

    }
    getPost()
  }, [])
  useEffect(()=>{
    const getImage = async () => {
      console.log('Files:', files);
    
      if (files.length > 0) {
        const formData = new FormData();
    
        for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i]);
        }
    
        try {
          const response = await axios.post('http://localhost:8000/file/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization':getAccessToken()
            },
          });
    
          console.log('Response:', response.data);
          setImageLinks(response.data)
        } catch (error) {
          console.log('Error:', error);
        }
      }
    };
    getImage()
  },[files])
  const handleEdit = async(e)=>{
    e.preventDefault()
    axios.put(`${getURL}/post/edit`,{...post,images:imageLinks && imageLinks.length>0?imageLinks:post.images,user:account.name},{headers:{
      "Authorization": getAccessToken(),
    }}).then(res=>{
      // console.log(res);
      if(res.status===200)
      navigate(`/post/${post._id}`)
    })
  }

  const handleInputChange = (e) =>{
    setPost({...post,[e.target.name]:e.target.value})
  }
  return (
    <div className="form-container">
      <h1>Edit Post</h1>
      <form onSubmit={handleEdit}>
        <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" value={post.title} onChange={handleInputChange}/>
        </div>
        <div className="form-group">
        <label htmlFor="title">Description</label>
        <textarea type="text" name="description" rows={6} value={post.description} id="description" onChange={handleInputChange}/>
        </div>
        <div className="form-group">

        <label htmlFor="files">Images</label>
        <input type="file" className="files-input" onChange={(e)=>setFiles(e.target.files)} multiple  name="files" id="files" />
        </div>

<button type="submit" className="create-post-btn">Save Post</button>
      </form>
    </div>
  )
}

export default EditPost