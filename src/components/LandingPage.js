import React from 'react';
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <>
            <center>
                <h1 className='my-3'>LandingPage</h1>
                <div className='container'>
                    <Link role="button" to="/login" className="btn btn-lg btn-outline-success mx-2">Login</Link>
                    <Link role="button" to="/signup" className="btn btn-lg btn-outline-primary mx-2">Signup</Link>
                </div>
            </center>
        </>

    )
}

export default LandingPage