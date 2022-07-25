import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    let nav = useNavigate();

    const handleOnChange = (e) => {
        e.preventDefault();

        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        // console.log(json);

        if (json.success === true) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            nav("/home");

            props.handleSetAlert("Login Successfull!", "success");
        } else {
            props.handleSetAlert("Invalid Credentials!", "danger");
        }
    }

    return (
        <>
            <h1 className='container text-center my-3'>Welcome Back!</h1>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3 my-2 mx-3">
                    <label htmlFor="email" className="form-label"><h5>Email address</h5></label>
                    <input type="email" className="form-control" onChange={handleOnChange} value={credentials.email} id="email" name='email' required />
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="password" className="form-label"><h5>Password</h5></label>
                    <input type="password" className="form-control" onChange={handleOnChange} value={credentials.password} id="password" name="password" required />
                </div>
                <div className='container text-center'>
                    <button type="submit" className="btn btn-lg btn-success">Login</button>
                </div>
            </form>
            <footer className='container mx-1'>
                <h5>Don't have an account?</h5>
                <Link className="btn btn-primary" to="/signup" role="button">Signup</Link>
            </footer>
        </>
    )
}

export default Login