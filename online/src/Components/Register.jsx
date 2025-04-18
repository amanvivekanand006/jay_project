import React, {useState} from 'react'
import axios from 'axios'
import "./Css/Register.css"
import { Link } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'

export default function Register_form() {
    const [form, setForm] = useState({
        username:"",
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        confirm_password: "",
        // user_type: ""
    })

    const handleChange=(e)=>{
        setForm({ ...form, [e.target.name]:e.target.value })
    }

    const handleSubmit= (e)=>{
      e.preventDefault()
      console.log(form)
      axios.post("http://127.0.0.1:8000/api/register_user/", form)
      .then((response)=>{
        console.log(response.data)
        toast.success('Registration Successfull!')
        setForm({
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
            // user_type: ""
          });
      })
      .catch((error)=>{
        console.error(error)
        const errorMessage = error.response?.data?.error || "Registration failed!";
        toast.error(errorMessage) })

    }


  return (
    <div className="Signup">
    <h1>Sign Up</h1>
    {/* {message && <p>{message}</p>} */}
    <form className="signupform" onSubmit={handleSubmit}>
        <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
        />
        <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={form.first_name}
            onChange={handleChange}
            required
        />
        <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={handleChange}
            required
        />
        <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
        />
        <input
            type="password"
            name="confirm_password"
            placeholder="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
            required
        />
        {/* <label>User Type:</label> */}
        {/* <select name="user_type" value={formData.user_type} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
        </select> */}
        <button className = "signupbtn" type="submit">Sign Up</button>
    </form>
    <p id="toggle-form">
        <p>Already have an Account ?</p>
        <Link to="/login">Login</Link> 
    </p>
    <ToastContainer />
</div>
  )
}
