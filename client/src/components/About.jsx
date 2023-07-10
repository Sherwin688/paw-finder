import React from 'react'
import "./About.css"
import { FaHome } from "react-icons/fa"
import { RiMoneyDollarCircleLine } from "react-icons/ri"
import { LuFiles } from "react-icons/lu"
const About = () => {
  return (
    <>
      <div className="section" style={{ padding: 10, display: "block" }}>
        <h1 style={{ textAlign: "center" }}>About Paw Finder</h1>
      </div>
      <div className="stats-section">
        <div className="stat">
          <FaHome style={{ fontSize: 80, marginBottom: 15 }} />
          <h2>Animals Adopted</h2>
          <h4>728</h4>
        </div>
        <div className="stat">
          <RiMoneyDollarCircleLine style={{ fontSize: 80, marginBottom: 15 }} />

          <h2>Funds Raised</h2>
          <h4>Rs. 210,000</h4>
        </div>
        <div className="stat">
          <LuFiles style={{ fontSize: 80, marginBottom: 15 }} />

          <h2>Adoptions Posts</h2>
          <h4>2390</h4>
        </div>
      </div>

      <div className="section">
        <div className="section-img">
          <img src="/images/logo-transparent.png" alt="" />
        </div>
        <div className="section-info" >
          <h2>Our Mission</h2>
          <p>At Paw Finder, our mission is to connect animals in need of a loving home with compassionate individuals and families. We strive to make the adoption process simple, efficient, and full of joy.</p>
        </div>
      </div>

      <div className="section" style={{ backgroundColor: "#fff" }}>

        <div className="section-info" >
          <h2>Why Choose Paw Finder</h2>
          <p>We understand that finding the right match for both the animal and the adopter is crucial. Paw Finder provides a platform where you can create posts about animals available for adoption, share their stories, and help potential adopters find their perfect companion.</p>
        </div>
        <div className="section-img">
          <img src="/images/star.jpg" alt="" />

        </div>
      </div>

      <div className="section" style={{display:"block"}}>

        <div className="section-info" >
          <h2>Join Our Community</h2>
          <p>By joining Paw Finder, you become part of a vibrant community of animal lovers. Connect with like-minded individuals, ask questions, schedule meet-and-greets, and share updates after successful adoptions. Together, we can make a positive impact in the lives of animals.</p>
        </div>
        <img src="/images/banner.png" alt="" style={{width:"600px",margin:30}}/>

      </div>
    </>
  )
}

export default About