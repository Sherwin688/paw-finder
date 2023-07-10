import React, { useContext, useEffect, useState } from 'react'
import "./home.css"
import { DataContext } from "../utils/context/DataProvider"
import axios from "axios"
import { getURL } from "../utils/ApiHelper"
import { Link } from "react-router-dom"
import Post from "../components/Post"
const Home = () => {
  const { account } = useContext(DataContext)
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  useEffect(() => {
    const getPosts = async () => {
      axios.get(`${getURL}/post/getAll?page=${currentPage}&pageSize=${pageSize}`).then(res => {
        setPosts(res.data.posts)
        setFilteredPosts(res.data.posts)
        setTotalPages(res.data.totalPages)
      }).catch(err => {
        console.log(err);
      })

    }
    getPosts()
  }, [currentPage])

  const getCustomPosts = async (keyword) => {
    axios.get(`${getURL}/post/getAll?page=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`).then(res => {
      setFilteredPosts(res.data.posts)
      setTotalPages(res.data.totalPages)
    }).catch(err => {
      console.log(err);
    })

  }

const handleSearch = (e) => {
  const searchValue = e.target.value.toLowerCase();

  getCustomPosts(searchValue)
  // setFilteredPosts(posts.filter((post) => {
  //   const keywords = post.title.toLowerCase().split(" ");

  //   return keywords.some((keyword) => keyword.includes(searchValue));
  // }))
}
return (
  <div className="home-container">
    <div className="hero-container">
      <img src="/images/logo.jpg" width={100} height={100} alt="" />
      <h1>Paw Finder</h1>
      <p>Find Pets That Need a Home</p>
      <div className="search-container">
        <input type="text" className="search" onChange={handleSearch} placeholder="Eg: Dogs, Cats" />
      </div>
    </div>
    <div className="posts-wrapper">
      {filteredPosts.length !== 0 &&
      <div className="page-buttons">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
          Previous
        </button>
        <span style={{ color: "#555555" }}>{currentPage}</span> <span style={{ fontSize: 12, display: "flex", justifyContent: "center", alignItems: "center" }}>/</span> <span style={{ color: "#555555" }}>{totalPages}</span>
        <button disabled={currentPage === totalPages || totalPages===0} onClick={() => setCurrentPage((prev) => prev + 1)}>
          Next
        </button>
      </div>}
      <div className="posts-container">

        {filteredPosts.length === 0 ? <h2 style={{ textAlign: "center", width: "100%", marginTop: 10 }}>No Posts</h2> : filteredPosts.map((post) => <Post post={post} key={post._id} />)}

      </div>
    </div>
  </div>
)
}

export default Home