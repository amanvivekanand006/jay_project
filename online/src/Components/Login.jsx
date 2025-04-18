import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Css/Login.css'
import { Link } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';

const Login_page = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login_user/", formData);
            console.log(response.data);
            setMessage(response.data.message);

            // ✅ Store access & refresh tokens
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            localStorage.setItem("student_id", response.data.student_id);
            localStorage.setItem("username", response.data.username);

            toast.success('Login completed successfully!');
            setTimeout(() => {
            if (response.data.user_type === "tutor") {
                navigate("/tutor");
            } else if (response.data.user_type === "admin") {
                navigate("/admin");
            } else {
                navigate("/home");
            }
            }, 1500);
        } catch (error) {
            console.error(error.response.data);
            setMessage(error.response.data.error || "Something went wrong!");
            toast.error(error.response.data.error || "Something went wrong!")
        }
    };

    return (
        <div className="login-container">
        <div className="Login">
            <h2>Login</h2>
            {message && <p>{message}</p>}
            <form className="loginform" onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Login</button>
                <Link href="{% url 'ResetView' %}">Forgot Password</Link>
            </form>
            <div className = "signup">
          <p id="toggle-form">
            <p>Don't have an Account ? </p>
            <Link to="/register">Signup</Link>
          </p>
       </div>
        </div>
        <ToastContainer />
        </div>

    );
};

export default Login_page;
