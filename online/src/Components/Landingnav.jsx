import React from 'react'
import lightbulb from './Images/lightbulb.png'
import "./Css/LandingPage.css"
import { Link } from 'react-router-dom'

export default function Landingnav() {
  return (
    <div>
                <header className="navbar">
          <div className="container">
            <h1 className="logo">
              <img src={lightbulb} alt="" />MINDGURU
            </h1>
            <nav>
              <ul className="nav-ul">
                <li><Link to="/">Home</Link></li>
                <li><a href="#about">About</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Contact</a></li>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                {/* <li><a href="{% url 'login' %}">Enroll in test</a></li>
                <li><a href="{% url 'login' %}">Views Marks</a></li>
                <li><a href="{% url 'login'%}">Log In</a></li> */}
              </ul>
            </nav>
          </div>
        </header>
    </div>
  )
}
