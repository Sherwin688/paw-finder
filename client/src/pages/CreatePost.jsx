import React, { useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from "../utils/context/DataProvider"
import axios from "axios"
import { getAccessToken } from "../utils/ApiHelper"
import "./CreatePost.css"
import { useNavigate } from "react-router-dom"
import { NotificationsContext } from "../utils/context/NotificationsProvider"
import {AiOutlineCloseCircle} from "react-icons/ai"
import {BsImages} from "react-icons/bs"
const { getURL } = require("../utils/ApiHelper")

const CreatePost = () => {
  const initialPostValues = {
    title: "",
    description: ""
  }
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const { account } = useContext(DataContext)
  const [files, setFiles] = useState([{
    name: "test.jpg",
    size: 123456,
    type: "image/jpeg",
    lastModified: 1630925678000
  }])
  const [errors, setErrors] = useState({});
  const [post, setPost] = useState(initialPostValues)
  const [imageLoading, setImageLoading] = useState(false)
  const [mainImg, setMainImg] = useState([])

  const navigate = useNavigate()
  const { getNotifications } = useContext(NotificationsContext)

  const getImage = async () => {
    setImageLoading(true);
    if (files.length > 0) {
      const formData = new FormData();
  
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
  
      try {
        return new Promise((resolve, reject) => {
          axios
            .post('http://localhost:8000/file/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': getAccessToken(),
              },
            })
            .then((res) => {
              if (res.status === 200) {
                setImageLoading(false);
                resolve(res.data);
              } else {
                resolve(null);
              }
            })
            .catch((error) => {
              setImageLoading(false);
              console.log('Error:', error);
              reject(error);
            });
        });
      } catch (error) {
        setImageLoading(false);
        console.log('Error:', error);
      }
    }
  };

  useEffect(()=>{
    console.log(images);
    if(images && images.length>0)
    setMainImg(images[0].img)
  },[files])

  useEffect(()=>{
    if(images.length<=0){
      fileInputRef.current.value=""
    }
  },[images])
  const handleFileUpload = (event) => {
    setFiles(event.target.files)
    const fileList = event.target.files
    const fileArray = Array.from(fileList);
    
    const readerPromises = fileArray.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerPromises)
      .then((results) => {
        setImages(results.map((img,ind)=>{
          if(ind===0){
            setMainImg(img)
            return {img:img,id:ind,styles:"active"}
          }
          else{
            return {img:img,id:ind,styles:""}
          }
        }));

      })
      .catch((error) => {
        console.log('Error reading files:', error);
      });
  };
  const handleSubmit = async () => {
    const imageLinks = await getImage()
    await axios.post(`${getURL}/create`, { ...post, imageLinks, user_name: account.name, user_phone: account.phone }, {
      headers: {
        "Authorization": getAccessToken(),
      }
    }).then(res => {
      navigate(`/post/${res.data.id}`)
      getNotifications()
    })
  }

  const handleInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

const handleImageClick = (image,index)=>{
  setMainImg(image.img)

  setImages(images.map((image,ind)=>{
    if(ind===index){
      return {...image,styles:"active"}
    }
    else{
      return {...image,styles:""}

    }
    
  }))
  

}

function createFileList(files) {
  const dataTransfer = new DataTransfer();

  for (const file of files) {
    dataTransfer.items.add(file);
  }

  return dataTransfer.files;
}
const handleImageDelete = (index)=>{
setImages(images.filter((image,ind)=>ind!==index))
setMainImg(images[0].img)
const updatedFiles = Array.from(files).filter((file, ind) => ind!==index);
// const updatedFileList = ;
setFiles(createFileList(updatedFiles))
}
const validateForm = () => {
  const errors = {};

  if (!post.title) {
    errors.title = 'Title is required.';
  }
  else if(post.title.length<5){
    errors.title = 'Title need to be more longer.';
  }

  if (fileInputRef.current.value.length===0) {
    errors.images = 'Images need to be uploaded';
  }

  if (!post.description) {
    errors.description = 'description is required.';
  } else if (post.description.length < 6) {
    errors.description = 'description must be at least 1 sentence long.';
  }

  return errors;
};
const handleValidation = (e)=>{
  e.preventDefault();
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length === 0) {
    handleSubmit();
  } else {
    setErrors(validationErrors);
  }
}
  return (
    <div className="create-form-container" style={{marginLeft:60}}>
      <div className="view-post-img">

        <div className="main-img">
          {images.length>0?<img src={mainImg} alt="main-img" />:<img src="/images/upload-template.jpg" alt="default-img" />}
          
        </div>
        <div className="other-imgs">

        {images && images.length<=0 && 
              <div className={`small-img-active`} >
                <img src={"/images/upload-template.jpg"}height={80} width={80} style={{ objectFit: "cover" }} alt="" />
            </div>}

          {images && images.length > 0 &&
            images.map((image,index) =>
           
              <div className={`small-img-${image.styles}`} key={index} >
                 <div className="delete-img" onClick={()=>handleImageDelete(index)}><AiOutlineCloseCircle style={{fontSize:25,zIndex:9999}}/></div>
                <img src={image.img} onClick={()=>handleImageClick(image,index)} height={80} width={80} style={{ objectFit: "cover" }} alt="" />
              
              </div>)}
        </div>
      </div>
      <form onSubmit={handleValidation}>
        <h1>Create Post</h1>
        <div className="create-form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" onChange={handleInputChange} />
        </div>
        <div className="create-form-group">
          <label htmlFor="title">Description</label>
          <textarea type="text" name="description" rows={6} id="description" onChange={handleInputChange} />
        </div>
        <div className="create-form-group">

          <label htmlFor="files"><div className="file-image-label">Add Images  <BsImages style={{marginLeft:5}}/></div></label>
          <input type="file" hidden ref={fileInputRef} className="files-input" onChange={handleFileUpload} multiple name="files" id="files" />
        </div>
        <button type="submit"  disabled={imageLoading} className="create-post-btn">Create Post</button>
        {errors.title && <div style={{color:"red"}}>{errors.title}</div>}
        {errors.description && <div style={{color:"red"}}>{errors.description}</div>}
        {errors.images && <div style={{color:"red"}}>{errors.images}</div>}
      </form>
    </div>
  )
}

export default CreatePost