import React from 'react'
import { Link } from 'react-router-dom'
import "./Css/Thanks.css"

export default function Thanks() {
  return (
    <div className='thanks'>
      <h1>Thank You for Taking the Test!</h1>
      <p>Your responses have been submitted.</p>
      <p>Get Back To Home</p>
      <Link to="/home">Home</Link>
    </div>
  )
}
