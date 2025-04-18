import React from 'react'
import land from "./Images/land.jpg"
import "./Css/LandingPage.css";



export default function Landinghome() {
  return (
    <div>
      <section id="landing-home" className="section ">
            <div class="video-container">
              <img src={land} alt="Landing" />
              {/* <video autoPlay muted loop>
                 <source src={land} type="video/mp4"/>
                 Your browser does not support the video tag.
               </video> */}
               </div>
               <div className="home">
               <h2>Welcome to MINDGURU</h2>
               <p>Prepare for your exams with ease and confidence.</p>
               </div>
          </section>
    </div>
  )
}
