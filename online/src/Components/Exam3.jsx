import React from "react";
import "./Css/CardOptions.css";
import { Link, useNavigate } from 'react-router-dom'


const CardOptions3 = () => {
  return (
    <div className="exam-card-container">
      <div className="card">
        <li><Link to="/marks2">Subjective Marks</Link></li>
      </div>
      <div className="card">
        <li><Link to="/report">Objective Marks</Link></li>
      </div>
    </div>
  );
};

export default CardOptions3;