import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../helper/IsLoggedIn";
import "./login.css"

export default function Login() {
    const [errorMessages, setErrorMessages] = useState({ name: "", message: "" });
    const [formData, setFormData] = useState({
        password: '',
        email: ''
      });
    const navigate = useNavigate();
    const [error,setError] = useState()
    const renderErrorMessage = (name: string) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        axios.defaults.baseURL = ''
        console.log(process.env.REACT_APP_BACKEND_URL)
        axios.post(process.env.REACT_APP_BACKEND_URL+'/api/login', { email: formData.email, password:formData.password }).then(response => {
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('userID', response.data.id);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('token', response.data.token);
            navigate("/home")
        }).catch(error => {
            console.log(error)
            setError(error.response.data.error)
        })
    };
    if(isLoggedIn()){
        return <Navigate to="/home" replace />;
    }
    return (
        <div className="login">
            <h2 className="title">
                Login
            </h2>
            {error && <div className="title-red">{error}</div>}
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input type="text" name="email" placeholder="Email address" value={formData.email} onChange={(e)=>{setFormData({...formData,email:e.target.value})}}required />
                        {renderErrorMessage("uname")}
                    </div>
                    <div className="input-container">
                        <input type="password" name="pass" placeholder="Password" value={formData.password} onChange={(e)=>{setFormData({...formData,password:e.target.value})}}required />
                        {renderErrorMessage("pass")}
                    </div>
                    <div className="button-container">
                        <input type="submit" value="Continue" />
                    </div>
                </form>
            </div>
            <div className="bottom-text">Don't have account? <Link className="signup-link" to="/signup">Sign up</Link></div>

        </div>
    );

}