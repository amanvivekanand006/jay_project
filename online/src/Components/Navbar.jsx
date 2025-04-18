import React from 'react'
import axios from 'axios'
import lightbulb from './Images/lightbulb.png'
import "./Css/Home.css"
import { Link, useNavigate} from 'react-router-dom'


export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const handleProtectedNavigation = (event) => {
    if (!token) {
      event.preventDefault(); // Prevent navigation
      navigate("/login"); // Redirect to login page
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const refreshToken = localStorage.getItem("refresh_token"); // Get stored refresh token
      if (!refreshToken) {
        console.log("No refresh token found.");
        return;
      }

      await axios.post("http://127.0.0.1:8000/logout/", {
        refresh_token: refreshToken  // Send refresh token to blacklist
      });

      // Clear tokens from local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("subjectname");
      localStorage.removeItem("student_id")

      console.log("Logged out successfully");
      navigate("/login");  // Redirect user to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
      <header className="navbar">
      <div className="container">
        <h1 className="logo">
          <img src={lightbulb} alt="" />MINDGURU
        </h1>
        <nav>
          <ul className="nav-ul">
            <li><Link to="/home" onClick={(e) => handleProtectedNavigation(e)}>Home</Link></li>
            <li><Link to="/subjects" onClick={(e) => handleProtectedNavigation(e)}>Enroll in test</Link></li>
            <li><Link to="/exam_type1" onClick={(e) => handleProtectedNavigation(e)}>Views Marks</Link></li>
            <li><Link to="/viewbank" onClick={(e) => handleProtectedNavigation(e)}>Study Materials</Link></li>
            <li>
              <Link to="#" onClick={handleLogout}>Log Out</Link>
            </li>
            {/* <li><a href="{% url 'login' %}">Enroll in test</a></li>
            <li><a href="{% url 'login' %}">Views Marks</a></li>
            <li><a href="{% url 'login'%}">Log In</a></li> */}
          </ul>
        </nav>
      </div>
    </header>
  )
}
