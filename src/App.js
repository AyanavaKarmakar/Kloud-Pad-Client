import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import LandingPage from "./components/LandingPage";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {

  const [alert, setAlert] = useState(null);

  const handleSetAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    });

    setTimeout(() => {
      handleSetAlert("", "");
    }, 5000);
  };

  return (
    <>
      <NoteState>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route
            exact path="/home"
            element={
              <>
                <Navbar />
                <Alert alert={alert} />
                <div className="container">
                  <Home handleSetAlert={handleSetAlert} />
                </div>
              </>
            }
          />
          <Route
            exact path="/about"
            element={
              <>
                <Navbar />
                <Alert alert={alert} />
                <div className="container">
                  <About />
                </div>
              </>
            }
          />
          <Route
            exact path="/login"
            element={
              <>
                <div className="container">
                  <Login handleSetAlert={handleSetAlert} />
                  <Alert alert={alert} />
                </div>
              </>
            }
          />
          <Route
            exact path="/signup"
            element={
              <>
                <div className="container">
                  <Signup handleSetAlert={handleSetAlert} />
                  <Alert alert={alert} />
                </div>
              </>
            }
          />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
