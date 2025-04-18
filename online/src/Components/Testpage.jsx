import React, {useEffect,useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import './Css/Testpage.css'
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';

function Testpage() {
  const { id } = useParams()
  const studentId = localStorage.getItem("student_id"); // Get student ID from local storage
  const subject = localStorage.getItem("subjectname")
  // const studentId = "17"
  // const subject = "react js"
  const[data,setData] = useState([])
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [timeLeft, setTimeLeft] = useState(0);

  const[form,setForm]= useState({
    student: studentId || "", // Ensure it's not null
    question: id || "", // Question ID from URL
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    answer5: "",
    subject: subject || ""
  
  })
  
  const handleChange=(e)=>{
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit=(e)=>{
    // e.preventDefault()
    if (e) e.preventDefault()
    const token = localStorage.getItem("access_token")
    console.log(token)
    console.log(form)
    axios.post(`http://127.0.0.1:8000/api/Taking_ans/${subject}/`,
      form,
      {
          headers: {
              'Authorization': `Bearer ${token}`, // Add token to headers
              'Content-Type': 'application/json' // Ensure JSON format
          }
      }
    )
    .then((response)=>{
        console.log(response.data)
        setErrorMessage("");
        toast.success('Answers submitted successfully!');
        setTimeout(()=>{
          navigate("/thanks")
        }, 1500)
        ;
    })
    .catch((error)=>{
        console.error(error)
        // Check if the response contains an error message from Django
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error); // Set the error message
        toast.error(error.response.data.error || "Something Went Wrong or Network Issue!")
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
        toast.error(error.response.data.error || "An unexpected error occurred. Please try again.")
      }
    })
}

// ----------------------------------------------------monitoring code starts here---------------------------------------------------------
useEffect(() => {
  const handleBlur = () => {
    console.log("Tab switched or window minimized!");
    // optionally send to backend
    axios.post("http://127.0.0.1:8000/api/log_event/", {
      student_id: studentId,
      event: "Tab switched or window minimized",
      timestamp: new Date().toISOString()
    });
  };

  window.addEventListener("blur", handleBlur);

  return () => {
    window.removeEventListener("blur", handleBlur);
  };
}, []);


useEffect(() => {
  let inactivityTimeout;

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
      console.log("Student inactive for 60 seconds");
      // optionally send to backend
      axios.post("http://127.0.0.1:8000/api/log_event/", {
        student_id: studentId,
        event: "Inactivity for 60 seconds",
        timestamp: new Date().toISOString()
      });
    }, 60000); // 60 seconds
  };

  // Activity events
  window.addEventListener("mousemove", resetInactivityTimer);
  window.addEventListener("keydown", resetInactivityTimer);

  // Start the initial timer
  resetInactivityTimer();

  // Clean up
  return () => {
    clearTimeout(inactivityTimeout);
    window.removeEventListener("mousemove", resetInactivityTimer);
    window.removeEventListener("keydown", resetInactivityTimer);
  };
}, []);
// ----------------------------------------------------------------monitoring code ends here----------------------------------------------------

  useEffect(()=>{
    fetch(`http://127.0.0.1:8000/api/update_test_questions/${id}/`)
    .then(response => response.json())
    .then((data) => {
       setData(data)
       console.log("Fetched subjects now:", data)

       // Dynamically set timer based on fetched exam_time
      if (data.exam_time) {
        setTimeLeft(data.exam_time * 60);  // converting minutes to seconds
      } else {
        setTimeLeft(900); // fallback to 15 mins if not provided
      }
    })
    .catch(error => console.error("Error fetching data:", error))
  },[id])
  
  // Timer Logic
  useEffect(() => {
    if (timeLeft === 0) return; // don't do anything if timer isn't set yet

    if (timeLeft < 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Convert timeLeft to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;




  return (
      <div className="form-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}

       <div className="timer">
        <h1>
          Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
        </div>

      <form id="testForm" onSubmit={handleSubmit}>
        <div>
        <h3>Question:{data.question1} </h3>
        <textarea name="answer1" value={form.answer1} onChange={handleChange} type="text" placeholder='Enter Your Answer Here'></textarea>
        </div>
        <div>
        <h3>Question:{data.question2} </h3>
        <textarea name="answer2" value={form.answer2} onChange={handleChange} type="text" placeholder='Enter Your Answer Here'></textarea>
        </div>
        <div>
        <h3>Question:{data.question3} </h3>
        <textarea name="answer3" value={form.answer3} onChange={handleChange} type="text" placeholder='Enter Your Answer Here'></textarea>
        </div>
        <div>
        <h3>Question:{data.question4} </h3>
        <textarea name="answer4" value={form.answer4} onChange={handleChange} type="text" placeholder='Enter Your Answer Here'></textarea>
        </div>
        <div>
        <h3>Question:{data.question5} </h3>
        <textarea name="answer5" value={form.answer5} onChange={handleChange} type="text" placeholder='Enter Your Answer Here'></textarea>
        </div>
    
        <button type="submit" >Submit</button>
      </form>
      <ToastContainer />
    </div>
        
  )
}

export default Testpage