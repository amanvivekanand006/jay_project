import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'; 
import './Css/Studentans.css'
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';



export default function Studentsans() {
  const { subject,id } = useParams(); 
  const[question,setQuestion] = useState([])
  const[ans,setAns] = useState([])
  const[marks,setMarks] = useState({
    marks1: 0,
    marks2: 0,
    marks3: 0,
    marks4: 0,
    marks5: 0,
    score: 0
  });
  const [message, setMessage] = useState("");
  
  const handleMarksChange = (e) => {
    const { name, value } = e.target;
    const updatedMarks = { ...marks, [name]: Number(value) };
  
    // Calculate total score
    const totalScore =
      Number(updatedMarks.marks1) +
      Number(updatedMarks.marks2) +
      Number(updatedMarks.marks3) +
      Number(updatedMarks.marks4) +
      Number(updatedMarks.marks5);
  
    updatedMarks.score = totalScore;
  
    setMarks(updatedMarks);
  };
  


  const handleChange=(e)=>{
    setMarks({ ...marks, [e.target.name]:e.target.value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(marks)
    axios.post(`http://127.0.0.1:8000/api/update_student_score/${subject}/${id}/`,marks,{ headers: { "Content-Type": "application/json" } })
    .then((response)=>{
      console.log(response)
      setMessage("Marks have been saved successfully!"); // Show success message
      toast.success('Student Marks Saved successfully!');
      setMarks({
        marks1: 0,
        marks2: 0,
        marks3: 0,
        marks4: 0,
        marks5: 0,
        score: 0
      })
      setTimeout(() => {
        setMessage("")
      }, 3000);
    })
    .catch((error)=>{
      console.error(error.response.data.error || "Failed To Save Marks!")
      toast.error()
      setMessage("Failed to save marks.");
  })
  }

  useEffect(()=>{
      fetch(`http://127.0.0.1:8000/api/student_ans/${subject}/${id}`)
      .then(response=>response.json())
      .then((data)=>{
         console.log("Fetched subjects:", data);
         setAns(data.length > 0 ? data[0] : {})})
      .catch(error => console.error("Error fetching data:", error));


      fetch(`http://127.0.0.1:8000/api/get_test_question/${subject}/`)
      .then(response=>response.json())
      .then((data)=>{
         console.log("Fetched questions:", data);
         setQuestion(data.length > 0 ? data[0] : {})})
      .catch(error => console.error("Error fetching data:", error));
      
    },[subject,id])
   
  return (
    <div className="ans-table-container">
      <h1>Student Answer</h1>
      {message && <div className="message-box">{message}</div>} {/* Success message */}
      <form onSubmit={handleSubmit}>
        <table id='ans-table'>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="3"><strong>Subject: { ans.subject }</strong></td>
            </tr>
            <tr>
              <td>{ question.question1 }</td>
              <td>{ ans.answer1 }</td>
              <td>
                <input
                  id="marks1"
                  className="marks-input"
                  type="number"
                  name="marks1"
                  min="0"
                  max="10"
                  value={marks.marks1}
                  onChange={handleMarksChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>{ question.question2 }</td>
              <td>{ ans.answer2 }</td>
              <td>
                <input
                  id="marks2"
                  className="marks-input"
                  type="number"
                  name="marks2"
                  min="0"
                  max="10"
                  value={marks.marks2}
                  onChange={handleMarksChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>{ question.question3 }</td>
              <td>{ ans.answer3 }</td>
              <td>
                <input
                  id="marks3"
                  className="marks-input"
                  type="number"
                  name="marks3"
                  min="0"
                  max="10"
                  value={marks.marks3}
                  onChange={handleMarksChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>{ question.question4 }</td>
              <td>{ ans.answer4 }</td>
              <td>
                <input
                  id="marks4"
                  className="marks-input"
                  type="number"
                  name="marks4"
                  min="0"
                  max="10"
                  value={marks.marks4}
                  onChange={handleMarksChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>{ question.question5 }</td>
              <td>{ ans.answer5 }</td>
              <td>
                <input
                  id="marks5"
                  className="marks-input"
                  type="number"
                  name="marks5"
                  min="0"
                  max="10"
                  value={marks.marks5}
                  onChange={handleMarksChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <label>Total Marks:</label>
    <input 
        id="score" 
        name="score" 
        type="number" 
        value={marks.score} 
        onChange={handleChange} 
        min="0"
        required 
    />
        {/* <label
          ><button id='sub-btn'>total marks
            <input 
            id="score" 
            name="score" 
            value={marks.score} 
            onChange={handleChange}/>
          </button>
        </label> */}
        <button id='sub-btn' type="submit">Submit Marks</button>
      </form>
      <ToastContainer />
    </div>
  )
}
