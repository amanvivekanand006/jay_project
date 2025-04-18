import React from 'react'
import pic1 from './Images/pic1.jpg'
import "./Css/Home.css"
import 'animate.css';
import Navbar from './Navbar';


export default function Home() {
  return (
    //   <!-- Main Content -->
    <div className='main-content'>
        <div id="home">
        <div className="home-container">
          <h2 className='animate__animated animate__rubberBand'>Welcome to MINDGURU</h2>
          <p>Your ultimate platform for online exams and learning.</p>
        </div>
        <div className="home-feature">
          <img src={pic1} alt="" />
        </div>
      </div>
       <div id="how-it-works">
         <div className="works">
           <h3>How It Works</h3>
           <p>
             Our platform is designed to be user-friendly and efficient. Here's
             how it works:
           </p>
           <div className="steps">
             <div className="step">
               <h4>Step 1: Sign Up</h4>
               <p>Create an account as a student or tutor to get started.</p>
             </div>
             <div className="step">
               <h4>Step 2: Create/Take Exams</h4>
               <p>Tutors can create exams and students can take exams.</p>
             </div>
             <div className="step">
               <h4>Step 3: Review Results</h4>
               <p>
                 Get instant feedback and detailed results to track progress.
               </p>
             </div>
           </div>
         </div>
       </div>
    </div>    
  )
}
