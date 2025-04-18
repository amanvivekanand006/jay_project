// import React, { useEffect, useState } from 'react'
// import boy from './Images/boy.jpg'
// import './Css/Subjects.css'
// import { Link } from 'react-router-dom'



// const handleSubjectClick = (subjectName) => {
//     localStorage.setItem("subjectname", subjectName);
//     console.log("i am saving sub name",subjectName)
// };


// const Subjects = () =>{
//     const[data,setData] = useState({subjects:[]})
//         useEffect(()=>{
//             fetch("http://127.0.0.1:8000/api/sub/")
//             .then(response => response.json())
//             .then((sub) => {
//                 console.log("Fetched subjects:", sub);
//                 setData(sub)})
//             .catch(error => console.error("Error fetching data:", error));
//         },[])



//   return (
//     <div className='card-container'>
//          {data.subjects.map((Subject, index)=>
//          (
//           <div className="card" key={Subject[1]}>
//               <img src={boy} alt="Photo" className="card-img" />
//               <button className="card-btn" onClick={() => handleSubjectClick(Subject[0])}>
//                    <Link to={`/testpage/${Subject[1]}`}> {Subject[0]}</Link>
//               </button>
//           </div>
//          ))}
//     </div> 
//   )
// }

// export default Subjects


import React, { useEffect, useState } from 'react';
import boy from './Images/boy.jpg';
import './Css/newsubject.css';
import { Link } from 'react-router-dom';

// save subject name to localStorage
const handleSubjectClick = (subjectName) => {
  localStorage.setItem("subjectname", subjectName);
  console.log("Saved subject name:", subjectName);
};

const Subjects = () => {
  const [subjectiveData, setSubjectiveData] = useState({ subjects: [] });
  const [objectiveData, setObjectiveData] = useState([]);

  // Fetch Subjective subjects
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/sub/")
      .then(response => response.json())
      .then(sub => {
        console.log("Fetched Subjective subjects:", sub);
        setSubjectiveData(sub);
      })
      .catch(error => console.error("Error fetching subjective subjects:", error));
  }, []);

  // Fetch Objective exams
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get-objective-exams/")  // <-- New API endpoint
      .then(response => response.json())
      .then(exams => {
        console.log("Fetched Objective exams:", exams);
        setObjectiveData(exams);
      })
      .catch(error => console.error("Error fetching objective exams:", error));
  }, []);

  return (
    <div className="exam-sections">

      <div className="exam-section">
            <h2 className="section-title">📚 Subjective Exams</h2>
            <div className='card-container'>
               {subjectiveData.subjects.map((Subject, index) => (
                    <div className="card" key={Subject[1]}>
                    <img src={boy} alt="Photo" className="card-img" />
                    <button className="card-btn" onClick={() => handleSubjectClick(Subject[0])}>
                      <Link to={`/testpage/${Subject[1]}`}>{Subject[0]}</Link>
                    </button>
                    </div>
                ))}
            </div>
     </div>

      <div className="exam-section">
               <h2  className="section-title">📖 Objective Exams</h2>
                    <div className='card-container'>
                            {objectiveData.map((exam) => (
                                <div className="card" key={exam.id}>
                                <img src={boy} alt="Photo" className="card-img" />
                                <button className="card-btn" onClick={() => handleSubjectClick(exam.subject_name)}>
                                <Link to={`/m_choice_exam/${exam.id}`}>{exam.subject_name}</Link>
                                </button>
                                </div>
                            ))}
                     </div>
        </div>

    </div>

  );
};

export default Subjects;

