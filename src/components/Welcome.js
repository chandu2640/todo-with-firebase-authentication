import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "./welcome.css";
import Image from '../assets/img.png';

export default function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  const handleRegister = () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Please confirm that email are the same");
      return;
    } else if (
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("Please confirm that password are the same");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="welcome">
      <div className="login-register-container">
        {isRegistering ? (
          <div className="container">
            <h1 className="input_text">Register</h1>
            <input
              type="email"
              placeholder="Email"
              className="inn"
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value
                })
              }
            />
            <input
              type="email"
              className="inn"
              placeholder="Confirm Email"
              value={registerInformation.confirmEmail}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmEmail: e.target.value
                })
              }
            />
            <input
              type="password"
              className="inn"
              placeholder="Password"
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value
                })
              }
            />
            <input
              type="password"
              className="inn"
              placeholder="Confirm Password"
              value={registerInformation.confirmPassword}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmPassword: e.target.value
                })
              }
            />
            <button className="sign-in-register-button" onClick={handleRegister}>Register</button>
            <p className="signin_text">Already have an Account? <span className="signup_btn" onClick={() => setIsRegistering(false)}>Log In</span></p>
          </div>
        ) : (
          <div className="container">
            <h1 className="input_text">Login</h1>
            <input type="email" className="inn" id="user_input1" placeholder="User name / Email" onChange={handleEmailChange} value={email} />
            <input
            id="user_input2"
            className="inn"
              type="password"
              onChange={handlePasswordChange}
              value={password}
              placeholder="Password"
            />
            <button className="sign-in-register-button" onClick={handleSignIn}>
              Sign In
            </button><br />

            <p className="signin_text">Don't have an account yet? <span className="signup_btn" onClick={() => setIsRegistering(true)}>Sign In</span></p>
          </div>
        )}
      </div>
      <img src={Image} className="image" alt="" />
    </div>
  );
}