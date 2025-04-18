import React from 'react'
import "./Css/Home.css"
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 MyWebsite. All rights reserved.</p>
        <div className="socials">
          <Link to="#">Facebook</Link>
          <Link to="#">Twitter</Link>
          <Link to="#">Instagram</Link>
        </div>
      </div>
    </footer>
  )
}
