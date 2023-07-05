import React, { useContext, useEffect, useState } from 'react'
import "./home.css"
import { DataContext } from "../utils/context/DataProvider"
import axios from "axios"
import { getURL } from "../utils/ApiHelper"
import { Link } from "react-router-dom"
import Post from "../components/Post"
const Home = () => {
  const { account } = useContext(DataContext)
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  useEffect(() => {
    const getPosts = async () => {
      axios.get(`${getURL}/post/getAll`).then(res => {
        setPosts(res.data)
        setFilteredPosts(res.data)
      }).catch(err => {
        console.log(err);
      })

    }
    getPosts()
  }, [])

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();

    setFilteredPosts(posts.filter((post) => {
      const keywords = post.title.toLowerCase().split(" ");

      return keywords.some((keyword) => keyword.includes(searchValue));
    }))
  }
  return (
    <div className="home-container">
      <div className="hero-container"  style={{}}>
        <img src="/images/logo.jpg" width={100} height={100} alt="" />
        <h1>Paw Finder</h1>
        <p>Find Pets That Need a Home</p>
      <div className="search-container">
        <input type="text" className="search" onChange={handleSearch} placeholder="Eg: Dogs, Cats" />
      </div>
      </div>
      <div className="posts-container">

        {filteredPosts.map((post) => <Post post={post} key={post._id} />)}

      </div>
    </div>
  )
}

export default Home