import React, { useState } from 'react';
import axios from 'axios';
import './Css/Addchoice.css';
import { toast,ToastContainer } from 'react-toastify';


function ObjectiveExamForm() {
  const [subjectName, setSubjectName] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [questions, setQuestions] = useState([
    { question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_answer: '' }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_answer: '' }]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { subject_name: subjectName, time_limit: timeLimit, questions };

    axios.post('http://127.0.0.1:8000/api/add-objective-exam/', payload)
      .then(response => {
        // alert('Exam added successfully!');
        console.log(response)
        setQuestions([
          { question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_answer: '' }
        ])
        setSubjectName('')
        setTimeLimit('')
        toast.success('Exam added successfully!')
      })
      .catch(error => {
        console.error('Error submitting exam:', error);
        toast.error(error.response.data.error || "Something Went Wrong!")
      });
  };

  return (
    <div>
    <form className="multiple-choice" onSubmit={handleSubmit}>
      <h2>Create Objective Exam</h2>
      <input type="text" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} placeholder="Subject Name" required />
      <input type="number" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} placeholder="Time Limit (in minutes)" required />

      {questions.map((q, index) => (
        <div className="question-card" key={index}>
          <input type="text" value={q.question_text} onChange={(e) => handleQuestionChange(index, 'question_text', e.target.value)} placeholder="Question Text" required />
          <input type="text" value={q.option_a} onChange={(e) => handleQuestionChange(index, 'option_a', e.target.value)} placeholder="Option A" required />
          <input type="text" value={q.option_b} onChange={(e) => handleQuestionChange(index, 'option_b', e.target.value)} placeholder="Option B" required />
          <input type="text" value={q.option_c} onChange={(e) => handleQuestionChange(index, 'option_c', e.target.value)} placeholder="Option C" required />
          <input type="text" value={q.option_d} onChange={(e) => handleQuestionChange(index, 'option_d', e.target.value)} placeholder="Option D" required />
          <input type="text" value={q.correct_answer} onChange={(e) => handleQuestionChange(index, 'correct_answer', e.target.value)} placeholder="Correct Answer (A/B/C/D)" required />

          <button type="button" className="remove-btn" onClick={() => removeQuestion(index)}>Remove</button>
        </div>
      ))}

      <button type="button" className="add-btn" onClick={addQuestion}>+ Add Question</button>
      <br /><br />
      <button type="submit" className="submit-btn">Submit Exam</button>
    </form>
    <ToastContainer />
    </div>
  );
}

export default ObjectiveExamForm;
