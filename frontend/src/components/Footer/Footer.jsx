import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, obcaecati magni similique quae ipsa beatae ex cumque! Sed maxime corrupti, excepturi error dicta voluptas eius explicabo dolore odit, accusamus eaque, accusantium nostrum ipsum in commodi necessitatibus sit dolor! Repellendus cumque laudantium labore odit. Ratione alias et sapiente veniam eveniet reiciendis?</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-797-771-7310</li>
            <li>info@foodie.com</li>
          </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyright">Copyright 2024 &copy; Tomato.com - All rights reserved.</p>
    </div>
  )
}

export default Footer