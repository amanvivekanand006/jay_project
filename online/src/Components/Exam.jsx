import React from "react";
import "./Css/CardOptions.css";
import { Link, useNavigate } from 'react-router-dom'


const CardOptions = () => {
  return (
    <div className="exam-card-container">
      <div className="card">
        <li><Link to="/addquestion">Subjective Exam</Link></li>
      </div>
      <div className="card">
        <li><Link to="/add_choice_exam">Multiple Choice</Link></li>
      </div>
    </div>
  );
};

export default CardOptions;
