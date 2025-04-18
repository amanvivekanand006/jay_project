import React,{useState} from 'react'
import axios from 'axios';
import './Css/Addtest.css'
import { toast,ToastContainer } from 'react-toastify';

export default function Addtest() {

    const[form,setForm]= useState({
      subjectname : '',
      question1 : '',
      question2 : '',
      question3 : '',
      question4 : '',
      question5 : '',
      exam_time: '',

    })

    const handleChange=(e)=>{
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(form)
        axios.post("http://127.0.0.1:8000/api/addquestion/",form)
        .then((response)=>{
            console.log(response.data)
            toast.success("Exam Test Created successfully!")
            setForm({
              subjectname : '',
              question1 : '',
              question2 : '',
              question3 : '',
              question4 : '',
              question5 : '',
              exam_time: '',

            })
        })
        .catch((error)=>{
            console.error(error)
            toast.error(error.response.data.error || "Something Went Wrong!")
        })
    }
  return (
    <div>
      <div className="test-checkout-container">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Create Test</h2>
        <div className="subjectname" id='subjectname'> 
          <label for="subjectname">Enter the Subject : </label>
          <input type="text" name="subjectname" value={form.subjectname} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label for="exam_time">Exam Time: </label>
          <input
            type="number"
            name="exam_time"
            placeholder='Exam Time In Minutes'
            value={form.exam_time}
            onChange={handleChange}
            min="1"
          />
        </div>
        <div className="form-group">
          <label for="question1">Question 1 : </label>
          <input type="text" name="question1" value={form.question1} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label for="question2">Question 2 : </label>
          <input type="text" name="question2" value={form.question2} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label for="question3">Question 3 : </label>
          <input type="text" name="question3" value={form.question3} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label for="question4">Question 4 : </label>
          <input type="text" name="question4" value={form.question4} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label for="question5">Question 5 : </label>
          <input type="text" name="question5" value={form.question5} onChange={handleChange}/>
        </div>
        <button type="submit" class="btn">Submit</button>
      </form>
    </div>
    <ToastContainer />
    </div>
  )
}



// http://127.0.0.1:8000/api/addquestion/

{/* <div>
<div>
  <label htmlFor="name">full name</label>
  <input type="text" name="name" value={form.name} onChange={handleChange}/>
</div>
<div>
<label htmlFor="age">age</label>
<input type="text" name="age" value={form.age} onChange={handleChange}/>
</div>
<div>
<label htmlFor="gender">gender</label>
<input type="text" name="gender" value={form.gender} onChange={handleChange}/>
</div>
<button onClick={handleSubmit}>submit</button>
</div> */}