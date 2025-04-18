import React from 'react'
import books from './Images/books.jpg'
import './Css/Subjects.css'
import { useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify';


export default function Tutorsubjects() {
    const { id } = useParams(); 
    
    const[data,setData] = useState({subjects:[]})
    
    const del_sub=(subjectId)=>{
        if (window.confirm("Are you sure you want to delete this subject?")) {
            axios.delete(`http://127.0.0.1:8000/api/del_subject/${subjectId}/`)
                .then(() => {
                    console.log(`Subject with ID ${subjectId} deleted`);
                    toast.success(`Subject with ID ${subjectId} deleted`)
                    setData(prevData => ({
                        subjects: prevData.subjects.filter(sub => sub[1] !== subjectId)
                    }));
                })
                .catch(error => console.error("Error deleting subject:", error));
        }
    };

            useEffect(()=>{
                fetch("http://127.0.0.1:8000/api/sub/")
                .then(response => response.json())
                .then((sub) => {
                    console.log("Fetched subjects:", sub);
                    setData(sub)})
                .catch(error => console.error("Error fetching data:", error));
            },[])
  return (
<div className='card-container'>
         {data.subjects.map((Subject, index)=>
         (
          <div className="card" key={Subject[1]}>
              <img src={books} alt="Photo" className="card-img" />
              <button className="card-btn">
                   <Link to={`/tutor_q_cust/${Subject[1]}`}> {Subject[0]}</Link>
              </button>
              <button className="card-btn">
                   <Link onClick={() => del_sub(Subject[1])}>Delete</Link>
              </button>
          </div>
         ))}
        <ToastContainer />
    </div> 
  )
}
