import axios from "axios"
import React, { useContext, useEffect, useState } from 'react'
import { getAccessToken, getURL } from "../utils/ApiHelper"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./Viewpost.css"
import { DataContext } from "../utils/context/DataProvider"
import { NotificationsContext } from "../utils/context/NotificationsProvider"
import { RiDeleteBin6Line } from "react-icons/ri"
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"

const ViewPost = () => {
  const [post, setPost] = useState("")
  const { id } = useParams()
  const [mainImg, setMainImg] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAdoptModal, setShowAdoptModal] = useState(false)
  const adoptioninitialValues = {
    name: "",
    phone: "",
    message: ""
  }
  const [application, setApplication] = useState(adoptioninitialValues)
  const [imageLinks, setImageLinks] = useState([])
  const [applicationExists, setApplicationExists] = useState(false)
  const { account } = useContext(DataContext)
  const navigate = useNavigate()
  const { getNotifications } = useContext(NotificationsContext)


  useEffect(() => {
    const getPost = async () => {
      axios.get(`${getURL}/post/${id}`).then(res => {
        setPost(res.data)
        checkIfApplicationExists(res.data._id)
        setImageLinks(res.data.images.map((img, index) => {
          return { id: index, imageLink: img, styles: index === 0 ? "active" : "" }
        }))


        setMainImg(res.data.images[0])
      }).catch(err => {
        console.log(err);
      })

    }
    getPost()
  }, [])

  const checkIfApplicationExists = async (post_id) => {
    axios.post(`${getURL}/application/exists`, { post_id: post_id, from: account.name, })
      .then(res => {
        if (res.status === 200) {
          setApplicationExists(true)
        }
      }).catch(err => {
        console.log(err);
      })

  }

  const handleImageClick = (imgLink, id) => {
    setMainImg(imgLink)
    setImageLinks(imageLinks.map(imageLink => imageLink.id === id ? { ...imageLink, styles: "active" } : { ...imageLink, styles: "" }))
  }

  const handleDelete = async () => {
    await axios.delete(`${getURL}/post/delete/${id}`, {
      headers: {
        "Authorization": getAccessToken(),
      }
    })
      .then(res => {
        if (res.status === 200) {
          navigate("/")
        }
      }).catch(err => {
        console.log(err);
      })
  }


  const handleAdoptionInputChange = (e) => {
    setApplication({ ...application, [e.target.name]: e.target.value })
  }

  const handleApplicationSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${getURL}/application/create`,
      { ...application, from: account.name, to: post.user_name, post_id: id, post_title: post.title, status: "Pending" }, {
        headers: {
          "Authorization": getAccessToken(),
        }
    }).then(res => {
      if (res.status === 200) {
        console.log(res.data);
        navigate("/")
        getNotifications()
      }
      // navigate(`/post/${res.data.id}`)
    })
  }
  return (
    <>
      {showDeleteModal &&
        <div className="delete-modal">
          <div className="delete-modal-content">
            <div className="close-icon" onClick={() => setShowDeleteModal(false)}><AiOutlineClose/></div>
            <p style={{marginTop:10}} >Are You Sure you want to delete this post?</p>
            <button className="delete-btn" onClick={handleDelete}>Delete Post</button>
          </div>
        </div>
      }
      {showAdoptModal &&
        <div className="delete-modal">
          <div className="delete-modal-content">
            <div className="close-icon" onClick={() => setShowAdoptModal(false)}><AiOutlineClose/></div>
            <form onSubmit={handleApplicationSubmit}>
              <h2 style={{ textAlign: "center" }}>Adoption Application</h2>
              <div className="form-group">
                <label htmlFor="name">name</label>
                <input type="text" name="name" id="name" onChange={handleAdoptionInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number: </label>
                <input type="text" name="phone" id="phone" onChange={handleAdoptionInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="title">message</label>
                <textarea type="text" name="message" style={{ resize: "none" }} rows={6} id="message" onChange={handleAdoptionInputChange} />
              </div>
              <div className="form-group">

              </div>

              <button type="submit" className="create-post-btn">Submit</button>
            </form>
          </div>
        </div>
      }
      <div className="container">
        <div className="view-post-container">

          <div className="view-post-img">

            <div className="main-img">
              <img src={mainImg} alt="" />
            </div>
            <div className="other-imgs">
              {post.images && post.images.length > 0 &&
                imageLinks.map((imgObj) => <div className={`small-img-${imgObj.styles}`} key={imgObj.id} onClick={() => handleImageClick(imgObj.imageLink, imgObj.id)}> <img src={imgObj.imageLink} height={80} width={80} style={{ objectFit: "cover" }} alt="" /></div>)}
            </div>
          </div>

          <div className="view-post-content">
            <div className="post-info">
              <h1 style={{ textAlign: "center",color:"#333333" }}>{post.title}</h1>
              <p  className="light-black"style={{ marginTop: 30, fontSize: 20 }}>Description</p>
              <p>{post.description}</p>
              <p className="light-black" style={{ marginTop: 30, fontSize: 20 }}>posted by :</p>
              <div className="small-profile-container" style={{fontWeight:600,color:"#000" }}><div className="profile-content"><CgProfile style={{fontSize:20,margin:"0 5px"}}/>{post.user_name}</div></div>
              <p className="light-black" style={{ marginTop: 30, fontSize: 20 }}>Status</p>
              <p>{post.status}</p>
            </div>
            {post.user_name === account.name ?
              <div className="btn-container">
                <Link className="edit-btn" to={`/post/edit/${post._id}`}><span>Edit</span> <AiOutlineEdit style={{ fontSize: 27 }} /> </Link>
                <button className="delete-btn" onClick={() => setShowDeleteModal(true)}><span>Delete</span><RiDeleteBin6Line style={{ fontSize: 30 }} /></button>

              </div>
              :
              post.status === "Closed" ?
                <button className="closed-btn">This animal has been adopted.</button>


                :

                applicationExists ?
                  <button className="exists-btn" disabled={applicationExists}>You have sent an Application</button>
                  :
                  <div className="post-btn">
                    <button className="adopt-btn" onClick={() => setShowAdoptModal(true)}>Adopt</button>
                  </div>
            }
          </div>
        </div>
      </div>

    </>
  )
}

export default ViewPost