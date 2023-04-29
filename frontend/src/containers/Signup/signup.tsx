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
