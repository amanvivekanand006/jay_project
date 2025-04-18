import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './Css/Mchoice.css';
import { useParams, useNavigate  } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';


const ObjectiveExamStart = ({  }) => {
  const studentName = localStorage.getItem("username")
  const { examId } = useParams();  // get examId from URL
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  // Fetch exam data on component mount
  useEffect(() => {
    if (examId) {
      axios.get(`http://127.0.0.1:8000/api/get-exam/${examId}/`)
        .then(response => {
          setExam(response.data);
          setTimeLeft(response.data.time_limit * 60); // set time in seconds
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching exam:', error);
        });
    }
  }, [examId]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      if (!loading) handleSubmit();  // avoid auto-submit before exam is loaded
      return;
    }

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft, loading]);

  const handleAnswerChange = (questionIndex, option) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };

  const handleSubmit = () => {
    const payload = {
      student_name: studentName,
      exam: examId,
      answers: answers
    };

    axios.post('http://127.0.0.1:8000/api/submit-answers/', payload)
      .then(res => {
        // alert('Exam submitted successfully!');
        toast.success('Exam submitted successfully!');
        setTimeout(()=>{
          navigate("/thanks")
        }, 1500)
        ;
      })
      .catch((error) => {
        console.error(error)
        if (error.response && error.response.data.error) {
              setErrorMessage(error.response.data.error); // Set the error message
              toast.error(error.response.data.error || "Something Went Wrong or Network Issue!")
        } else {
              setErrorMessage("An unexpected error occurred. Please try again.");
              toast.error(error.response.data.error || "An unexpected error occurred. Please try again.")
            }
       });
  };

  if (loading || !exam) return <p>Loading exam...</p>;

  return (
    <div className='exam-form'>
      <h1>{exam.subject_name} Exam</h1>
      <h2>Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</h2>

      {exam.questions && exam.questions.map((q, index) => (
        <div key={index}>
          <h4>{q.question_text}</h4>
          {['A', 'B', 'C', 'D'].map(opt => (
            <label key={opt}>
              <input
                type="radio"
                name={`q${index}`}
                value={opt}
                onChange={() => handleAnswerChange(index, opt)}
                checked={answers[index] === opt}
              />
              {q[`option_${opt.toLowerCase()}`]}
            </label>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit Exam</button>
      <ToastContainer />
    </div>
  );
};

export default ObjectiveExamStart;
