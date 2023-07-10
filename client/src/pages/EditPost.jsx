import React, { useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from "../utils/context/DataProvider"
import axios from "axios"
import { getAccessToken } from "../utils/ApiHelper"
import "./CreatePost.css"
import { useNavigate, useParams } from "react-router-dom"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { BsImages } from "react-icons/bs"
const { getURL } = require("../utils/ApiHelper")

const EditPost = () => {
  const { id } = useParams()
  const initialPostValues = {
    title: "",
    description: ""
  }

  const [fileType, setFileType] = useState("links")
  const { account } = useContext(DataContext)
  const [files, setFiles] = useState([{
    name: "test.jpg",
    size: 123456,
    type: "image/jpeg",
    lastModified: 1630925678000
  }])
  const [images, setImages] = useState([]);
  const [mainImg, setMainImg] = useState([])
  const [errors, setErrors] = useState([])
  const fileInputRef = useRef(null);
  const [imageLinks, setImageLinks] = useState([])
  const [imgUpdate, setImgUpdate] = useState(false)
  const [post, setPost] = useState(initialPostValues)
  const navigate = useNavigate()

  const setMainImage = (index) => {

    if (fileType === "filereader") {
      const imgs = images.filter((img, ind) => ind !== index)
      setMainImg(imgs && imgs.length > 0 ? imgs[0].img : "/images/upload-template.jpg")

    }
    else {
      const imgs = imageLinks.filter((img, ind) => ind !== index)
      // setMainImg(images[0].img)
      setMainImg(imgs && imgs.length > 0 ? imgs[0].imageLink : "/images/upload-template.jpg")
    }
  }
  useEffect(() => {
    const getPost = async () => {
      axios.get(`${getURL}/post/${id}`).then(res => {
        setPost(res.data)

        setImageLinks(res.data.images.map((imageLink, ind) => {
          if (ind === 0) {
            setMainImg(imageLink)
            return { imageLink: imageLink, id: ind, styles: "active" }
          }
          else {
            return { imageLink: imageLink, id: ind, styles: "" }
          }
        }));
        // setMainImage()


      }).catch(err => {
        console.log(err);
      })
    }
    getPost()
  }, [])
  
  useEffect(()=>{
    if(fileType==="links")
    {
      let f = 0
    imageLinks.forEach((imageLink)=>{
      if(imageLink.styles==="active"){
        f=1
      }
    })
    if(f===0){
      setImageLinks(imageLinks.map((imageLink,ind)=>{
        if(ind===0){
          return {...imageLink,styles:"active"}
        }
        else{
          return {...imageLink}
        }
      }))
    }
  }
  else{
    let f = 0
  images.forEach((image)=>{
    if(image.styles==="active"){
      f=1
    }
  })
  if(f===0){
    setImages(images.map((image,ind)=>{
      if(ind===0){
        return {...image,styles:"active"}
      }
      else{
        return {...image}
      }
    }))
  }
}
  },[imgUpdate])
  // useEffect(() => {
  //   const getImage = async () => {
  //     console.log('Files:', files);

  //     if (files.length > 0) {
  //       const formData = new FormData();

  //       for (let i = 0; i < files.length; i++) {
  //         formData.append('files', files[i]);
  //       }

  //       try {
  //         const response = await axios.post('http://localhost:8000/file/upload', formData, {
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //             'Authorization': getAccessToken()
  //           },
  //         });

  //         console.log('Response:', response.data);
  //         setImageLinks(response.data)
  //       } catch (error) {
  //         console.log('Error:', error);
  //       }
  //     }
  //   };
  //   getImage()
  // }, [files])
  const getImage = async () => {
    // setImageLoading(true);
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
                // setImageLoading(false);
                resolve(res.data);
              } else {
                resolve(null);
              }
            })
            .catch((error) => {
              // setImageLoading(false);
              console.log('Error:', error);
              reject(error);
            });
        });
      } catch (error) {
        // setImageLoading(false);
        console.log('Error:', error);
      }
    }
  };
  const handleEdit = async () => {
    let postImageLinks
    if (fileType === "filereader") {
      postImageLinks = await getImage()
    }
    else {
      postImageLinks = imageLinks.map(imageLink => imageLink.imageLink)
    }
    axios.put(`${getURL}/post/edit`, { ...post, images: postImageLinks, user: account.name }, {
      headers: {
        "Authorization": getAccessToken(),
      }
    }).then(res => {
      // console.log(res);
      if (res.status === 200)
        navigate(`/post/${post._id}`)
    })
  }
  const handleInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }
  const handleImageClick = (image, index) => {
    if (fileType === "filereader") {

      setMainImg(image.img)

      setImages(images.map((image, ind) => {
        if (ind === index) {
          return { ...image, styles: "active" }
        }
        else {
          return { ...image, styles: "" }

        }

      }))
    }
    else {
      setMainImg(image.imageLink)

      setImageLinks(imageLinks.map((imageLink, ind) => {
        if (ind === index) {
          return { ...imageLink, styles: "active" }
        }
        else {
          return { ...imageLink, styles: "" }

        }

      }))
    }


  }
  const createFileList = (files) => {
    const dataTransfer = new DataTransfer();

    for (const file of files) {
      dataTransfer.items.add(file);
    }

    return dataTransfer.files;
  }
  const handleFileUpload = (e) => {
    setFileType("filereader")
    setFiles(e.target.files)
    const fileList = e.target.files
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
        setImages(results.map((img, ind) => {
          if (ind === 0) {
            setMainImg(img)
            return { img: img, id: ind, styles: "active" }
          }
          else {
            return { img: img, id: ind, styles: "" }
          }
        }));

      })
      .catch((error) => {
        console.log('Error reading files:', error);
      });
  };
  const handleImageDelete = (index) => {
    setImgUpdate((prev=>!prev))
    if (fileType === "filereader") {
      setImages(images.filter((image, ind) => ind !== index))
      // setMainImg(images[0].img)
      const updatedFiles = Array.from(files).filter((file, ind) => ind !== index);
      setFiles(createFileList(updatedFiles))
    }
    else {
      setImageLinks(imageLinks.filter((imageLink, ind) => ind !== index))
      // setMainImg(imageLinks[0].imageLink)

    }
    setMainImage(index)
  }
  const validateForm = () => {
    const errors = {};
  
    if (!post.title) {
      errors.title = 'Title is required.';
    }
    else if(post.title.length<5){
      errors.title = 'Title need to be more longer.';
    }
    // console.log(post.images.length);
    // console.log(post.imageLinks.length);
  
    if(fileType==='filereader'){
      if (images && images.length<=0) {
        errors.images = 'Images need to be uploaded';
      }
    }
    else{
      if (imageLinks.length<=0) {
        errors.images = 'Images need to be uploaded';
      }
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
      handleEdit();
    } else {
      setErrors(validationErrors);
    }
  }
  return (
    <div className="create-form-container">
      <div className="view-post-img">

        {fileType === "links" &&
          <>
            <div className="main-img">
              {imageLinks.length > 0 ? <img src={mainImg} alt="main-img" /> : <img src="/images/upload-template.jpg" alt="image-template" />}

            </div>
            <div className="other-imgs">

              {imageLinks && imageLinks.length > 0 &&
                imageLinks.map((imageLink, index) =>

                  <div className={`small-img-${imageLink.styles ? imageLink.styles : ""}`} key={index} >
                    <div className="delete-img" onClick={() => handleImageDelete(index)}><AiOutlineCloseCircle style={{ fontSize: 25, zIndex: 9999 }} /></div>
                    <img src={imageLink.imageLink} key={imageLink.id} onClick={() => handleImageClick(imageLink, index)} height={80} width={80} style={{ objectFit: "cover" }} alt="" />

                  </div>)}
            </div>
          </>
        }
        {fileType === "filereader" &&
          <>
            <div className="main-img">
              {images.length > 0 ? <img src={mainImg} alt="main-img" /> : <img src="/images/upload-template.jpg" alt="image-template" />}

            </div>
            <div className="other-imgs">

              {images && images.length > 0 &&
                images.map((image, index) =>

                  <div className={`small-img-${image.styles ? image.styles : ""}`} key={index} >
                    <div className="delete-img" onClick={() => handleImageDelete(index)}><AiOutlineCloseCircle style={{ fontSize: 25, zIndex: 9999 }} /></div>
                    <img src={image.img} key={image.id} onClick={() => handleImageClick(image, index)} height={80} width={80} style={{ objectFit: "cover" }} alt="" />

                  </div>)}
            </div>
          </>
        }
      </div>
      <form onSubmit={(e)=>handleValidation(e)}>
        <h1>Edit Post</h1>
        <div className="create-form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={post.title} onChange={handleInputChange} />
        </div>
        <div className="create-form-group">
          <label htmlFor="title">Description</label>
          <textarea type="text" name="description" rows={6} value={post.description} id="description" onChange={handleInputChange} />
        </div>
        <div className="create-form-group">

          <label htmlFor="files" ><div className="file-image-label">Add Images  <BsImages style={{ marginLeft: 5 }} /></div></label>
          <input type="file" hidden ref={fileInputRef} className="files-input" onChange={handleFileUpload} multiple name="files" id="files" />
        </div>
        <button type="submit" className="create-post-btn">Save Post</button>
        {errors.title && <div style={{color:"red"}}>{errors.title}</div>}
        {errors.description && <div style={{color:"red"}}>{errors.description}</div>}
        {errors.images && <div style={{color:"red"}}>{errors.images}</div>}
      </form>
    </div>
  )
}

export default EditPost