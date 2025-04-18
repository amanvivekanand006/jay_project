import React from 'react'
import "./Css/LandingPage.css";


export default function Landingcontact() {
  return (
<div className='contact-container'>
      <div id='contact' className='animate__animated animate__backInLeft'>
      <h1 id='phone'>PHONE:</h1>
      <h1 id='number'> 9949098089</h1>
      <h1 id='address'>ADDRESS:</h1>
      <h1 id='my_add'> 18-200, Mes Colony, Venkatapuram, Alwal, Sec, 500015</h1>
      <h1 id='email_id'>EMAIL:</h1>
      <h1 id='my_email'>MINDGURU@gmail.com</h1>
      </div>
      <div id='send-msg' className='animate__animated animate__backInRight'>
        <h1>Get In Touch!</h1>
        <div className='inline-inputs'>
             <input id='send-name' placeholder='Name'></input>
             <input id='email' placeholder='Email'></input>
        </div >
        <div className='inline-inputs2'>
             <input id='subject' placeholder='Subject'></input>
        </div>  
        <div className='inline-inputs3'>
             <input id='message' placeholder='Message'></input>
        </div> 
        <div className='snd-btn'>
        <button><a href='#'>Send Message!</a></button>
        </div>
      </div>
    </div>
  )
}
