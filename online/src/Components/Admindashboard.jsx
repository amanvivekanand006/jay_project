import React from 'react'
import './Css/Admin.css'
import { Link } from 'react-router-dom'
import CardOptions from './Exam'


export default function Admindashboard() {
  return (
    <div className='admin-body'>
    <div class="admin-container">
    <header>
      <h1>Admin Dashboard</h1>
    </header>
     <div class="dashboard">
      {/* <div class="dash1"> */}
        <div class="admin-card" id="orders">
          <h2><Link to="/user">Users</Link></h2>
        </div>
        
        
        <div class="admin-card" id="orders">
        <h2><Link to="/profile">Profiles</Link></h2>
        </div>

        <div class="admin-card" id="complaints">
          <h2><Link to="/exam_type5">Create Test</Link></h2>
        </div>

        <div class="admin-card" id="complaints">
          <h2><Link to="/subjects2">Tests Questions</Link></h2>
        </div>

        <div class="admin-card" id="users">
          <h2><Link to="/marks2">Marks Reports</Link></h2>
          <div class="details">
          </div>
        </div>
      {/* </div> */}
     </div>
  </div>
  </div>
  )
}

