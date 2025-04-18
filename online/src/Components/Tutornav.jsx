import React from 'react'
import axios from 'axios';
import lightbulb from './Images/lightbulb.png'
import { Link, useNavigate } from 'react-router-dom'
// import './Css/Home.css'

export default function Tutornav() {
  const navigate = useNavigate()
  const token = localStorage.getItem("access_token");
  const userType = localStorage.getItem("user_type"); // Retrieve user type

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
          <img src={lightbulb}/>MINDGURU
        </h1>
        <nav>
          <ul className="nav-ul">
            <li><Link to="/tutor" onClick={(e) => handleProtectedNavigation(e)}>Home</Link></li>
            {/* <li><a href="{% url 'studentname' %}">students Ans</a></li>
            <li><a href="{% url 'teacherS' %}">Test Papers</a></li>
            <li><a href="{% url 'addquestion' %}">Add a test</a></li>
            <li><a href="{% url 'markstable' %}">Views Marks</a></li>
            <li>
              <a href="{% url 'logout'%}">Log out</a>
            </li> */}
            <li><Link to="/students" onClick={(e) => handleProtectedNavigation(e)}>students Ans</Link></li>
            <li><Link to="/subjects2" onClick={(e) => handleProtectedNavigation(e)}>Test Papers</Link></li>
            <li><Link to="/exam_type" onClick={(e) => handleProtectedNavigation(e)}>Add a test</Link></li>
            <li><Link to="/students2" onClick={(e) => handleProtectedNavigation(e)}>Student Logs</Link></li>
            <li><Link to="/questionbank" onClick={(e) => handleProtectedNavigation(e)}>Add Material</Link></li>
            <li><Link to="/exam_type3" onClick={(e) => handleProtectedNavigation(e)}>Views Marks</Link></li>
            <li><Link to="#" onClick={handleLogout}>Log Out</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
