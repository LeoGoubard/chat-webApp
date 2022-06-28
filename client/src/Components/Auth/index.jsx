import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import Form from './Form';
import signinImage from '../../assets/signup.jpg';

const initialState = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true)

    const handleChange = (evt) => {
        setForm({ ...form, [evt.target.name]: evt.target.value });
    }

    const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup);
    };
    const handleSubmit = (evt) => {
      evt.preventDefault();
      console.log('YOOO');
      console.log(form);
    }
  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
            <Form
              isSignup={isSignup}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup
                ? "Already have an account ?"
                : "Don't have an Account ?"
              }
              <span onClick={() => switchMode()}>
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signinImage} alt="Sign In" />
      </div>
    </div>
  )
}

export default Auth