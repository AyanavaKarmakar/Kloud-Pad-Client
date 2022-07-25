import React from 'react';
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <>
            <center>
                <h1 className='my-3'>Welcome to Kloud Pad!</h1>
                <div className='container my-4'>
                    <Link role="button" to="/login" className="btn btn-lg btn-outline-success mx-10">Login</Link>
                    <Link role="button" to="/signup" className="btn btn-lg btn-outline-primary mx-10">Signup</Link>
                </div>
            </center>
        </>

    )
}

export default LandingPage