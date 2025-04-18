// import React, { useEffect, useState } from 'react';
// import './Css/Report.css';

// const StudentReports = () => {
//   const [reports, setReports] = useState([]);
//   const [search, setSearch] = useState("");
//   const[Users, setUsers] =useState([])
//   const[Marks, setMarks] = useState([])

//   useEffect(() => {
//     fetch('http://localhost:8000/student-reports/')
//       .then((response) => response.json())
//       .then((data) => setReports(data))
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   const reports = Marks.filter(
//     (mark) =>
//       get_student_name(mark.student).toLowerCase().includes(search.toLowerCase()) ||
//       mark.subject.toLowerCase().includes(search.toLowerCase()) ||
//       (mark.score ? mark.score.toString().toLowerCase().includes(search.toLowerCase()) : false) // ✅ Prevent null error
//   );

//   return (
//     <div className="reports-container">
//       <header>      
//         <h1>Student Marks Reports</h1>
//       </header>
//       <div className="search-bar">
//         <input type="text" id="search-input" placeholder="Search users..." 
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)} />
//         {/* <button >Search</button> */}
//       </div>
//       <table className="reports-table">
//         <thead>
//           <tr>
//             <th>Student Name</th>
//             <th>Exam</th>
//             <th>Marks Obtained</th>
//             <th>Submission Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reports.map((report, index) => (
//             <tr key={index}>
//               <td>{report.student_name}</td>
//               <td>{report.exam.subject_name}</td>
//               <td>{report.marks_obtained}</td>
//               <td>{new Date(report.submitted_at).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentReports;



import React, { useEffect, useState } from 'react';
import './Css/Report.css';

const StudentReports = () => {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('http://localhost:8000/student-reports/')
      .then((response) => response.json())
      .then((data) => setReports(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // ✅ filter directly on fetched reports
  const filteredReports = reports.filter(
    (report) =>
      (report.student_name && report.student_name.toLowerCase().includes(search.toLowerCase())) ||
      (report.exam?.subject_name && report.exam.subject_name.toLowerCase().includes(search.toLowerCase())) ||
      (report.marks_obtained !== null && report.marks_obtained.toString().includes(search))
  );

  return (
    <div className="reports-container">
      <header>      
        <h1>Student Marks Reports</h1>
      </header>
      <div className="search-bar">
        <input 
          type="text" 
          id="search-input" 
          placeholder="Search reports..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Exam</th>
            <th>Marks Obtained</th>
            <th>Submission Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report, index) => (
            <tr key={index}>
              <td>{report.student_name}</td>
              <td>{report.exam.subject_name}</td>
              <td>{report.marks_obtained}</td>
              <td>{new Date(report.submitted_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentReports;

