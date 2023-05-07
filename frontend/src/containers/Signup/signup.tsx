/*
This file contains the Signup component which is used to render the sign-up page of the application.
It imports axios to handle HTTP requests and useState to manage form data and errors.
It also imports useNavigate to redirect the user after successful sign-up.
The component renders a form where the user can enter their email, name, and password to create a new account.
Upon form submission, the function handleSubmit sends a POST request to the server to create a new user account with the entered details.
If the request is successful, the user is redirected to the home page.
If there is an error, it is logged in the console and no action is taken.
*/
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css"
export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        password2: '',
    });
    const [error,setError] = useState()
    const navigate = useNavigate();

    function handleInputChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        axios.post(process.env.REACT_APP_BACKEND_URL+'/api/users', { email: formData.email , name: formData.name, password: formData.password }).then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
            console.log(error.response.status)
        })
        navigate('/')
    }
    return (
        <div className="signup">
            <div className="container-signup">
                <h2 className="title">Sign Up</h2>
                {error && <div></div>}
                <div className="signup-form">
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <input type="text" name="email" placeholder="Email address" value={formData.email} onChange={handleInputChange} required />
                        </div>
                        <div className="input-container">
                            <input type="text" name="name" placeholder="Username" value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div className="input-container">
                            <input type="password" name="password" placeholder="Password"  value={formData.password} onChange={handleInputChange} required />
                        </div>
                        <div className="input-container">
                            <input type="password" name="password2" placeholder="Verify password"  value={formData.password2} onChange={handleInputChange}required />
                        </div>
                        <div className="button-container">
                            <input type="submit" value="Register" />
                        </div>
                    </form>
                </div>
            </div>



        </div>
    )
}
