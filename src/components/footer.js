import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
   return (
      <div className="footer">
         <div className="footer-container">
            <div className="footer-section about-section">
               <h3>About Us</h3>
               <p>
                  We are a passionate team dedicated to creating innovative and
                  beautiful websites that leave a lasting impact.
               </p>
            </div>
            <div className="footer-section contacts-section">
               <h3>Contact Us</h3>
               <div className="contact-info">
                  <p>123 Tembisa 1632</p>
                  <p>Email: temoshomaduane@gmail.com</p>
                  <p>Phone: +27 7213 71977</p>
               </div>
               <div className="social-icons">
                  <a href="https://www.facebook.com/temosho.shaku">
                     <FaFacebook />
                  </a>
                  <a href="https://www.linkedin.com/in/temosho-shaku-a2598917b/">
                     <FaLinkedin />
                  </a>
                  <a href="https://twitter.com/KingFiasc0">
                     <FaTwitter />
                  </a>
                  <a href="https://github.com/TemoshoS">
                     <FaGithub />
                  </a>
               </div>
            </div>
            <div className="map-and-contact-form">
               <div className="map-section">
                  <iframe
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.758999597739!2d28.22913641057462!3d-25.975943154620815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95698c1c71dd9b%3A0xa26b33c43b766f75!2sPhumulani%20Mall!5e0!3m2!1sen!2sza!4v1699024162986!5m2!1sen!2sza"
                     title="Google Map"
                     width="100%"
                     height="250"
                     frameBorder="0"
                     allowFullScreen=""
                  ></iframe>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Footer;
