import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import Form from './Form';
import signinImage from '../../assets/signup.jpg';


const cookies = new Cookies();

const initialState = {
  fullName: '',
  userName: '',
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
    const handleSubmit = async (evt) => {
      evt.preventDefault();

      const { fullName, userName, password, phoneNumber, avatarURL } = form;
      const URL = 'http://localhost:8000/auth';

      const { data: { token, userId, hashedPassword } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
        userName, password, fullName, phoneNumber, avatarURL,
      });
      cookies.set('token', token);
      cookies.set('userName', userName);
      cookies.set('fullName', fullName);
      cookies.set('userId', userId);

      if (isSignup) {
        cookies.set('phoneNumber', phoneNumber);
        cookies.set('avatarURL', avatarURL);
        cookies.set('hashedPassword', hashedPassword);
      }

      window.location.reload();
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