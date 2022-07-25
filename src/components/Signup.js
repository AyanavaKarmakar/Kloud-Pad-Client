import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });

    let nav = useNavigate();

    const handleOnChange = (e) => {
        e.preventDefault();

        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password } = credentials;

        const response = await fetch("http://localhost:5000/api/auth/create-user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();

        // save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        nav("/home");

        props.handleSetAlert("Account created successfully!", "success");
    }

    return (
        <div className='container my-5'>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3 mx-3">
                    <label htmlFor="name" className="form-label"><h5>Name</h5></label>
                    <input type="text" className="form-control" id="name" name="name" minLength={5} onChange={handleOnChange} required />
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="email" className="form-label"><h5>Email address</h5></label>
                    <input type="email" className="form-control" id="email" name="email" onChange={handleOnChange} required />
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="password" className="form-label"><h5>Create a password</h5></label>
                    <input type="password" className="form-control" id="password" name="password" minLength={5} onChange={handleOnChange} required />
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="confirmPassword" className="form-label"><h5>Confirm Password</h5></label>
                    <input type="password" className="form-control" id="confirmPassword" minLength={5} onChange={handleOnChange} name="confirmPassword" required />
                </div>
                <div className='container text-center'>
                    <button type="submit" className="btn btn-lg btn-primary">Signup</button>
                </div>
            </form>
            <footer className='container mx-1'>
                <h5>Already have an account?</h5>
                <Link className="btn btn-success" to="/login" role="button">Login</Link>
            </footer>
        </div>
    )
}

export default Signup