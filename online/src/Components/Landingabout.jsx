import React from 'react'
import girl from "./Images/girl.jpg"
import "./Css/LandingPage.css";



export default function Landingabout() {
  return (
   <div className="about-section">
      <div className="about-content-container">
        {/* Image Section */}
        <div className="about-image-container">
          <img
            src={girl}
            alt="Student holding books"
            className="about-image"
          />
        </div>

        {/* Content Section */}
        <div className="about-text-container">
          <h2 className="about-title">About Us</h2>
          <p className="about-description">
            Welcome to our online examination platform! We provide an innovative
            and user-friendly solution to help students excel and teachers
            assess with ease. With cutting-edge features and a secure platform,
            we strive to revolutionize the way education is delivered.
          </p>
          <div className="stats-container">
            {/* Stats */}
            <div className="stat-box">
              <h3 className="stat-number">3K+</h3>
              <p className="stat-description">Highly Trained Teachers</p>
            </div>
            <div className="stat-box">
              <h3 className="stat-number">300+</h3>
              <p className="stat-description">Study Centers Worldwide</p>
            </div>
            <div className="stat-box">
              <h3 className="stat-number">48+</h3>
              <p className="stat-description">Countries We Serve</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
