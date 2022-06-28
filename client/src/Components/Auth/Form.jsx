import React from 'react'

const Form = ({
  isSignup,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={(evt) => handleSubmit(evt)}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                  <label htmlFor="fullName">Full Name</label>
                  <input 
                      name="fullName"
                      type="text"
                      placeholder="Full Name"
                      onChange={(evt) => handleChange(evt)}
                      required
                  />
              </div>
            )}
              <div className="auth__form-container_fields-content_input">
                  <label htmlFor="userName">Username</label>
                  <input 
                      name="userName"
                      type="text"
                      placeholder="Username"
                      onChange={(evt) => handleChange(evt)}
                      required
                  />
              </div>
              {isSignup && (
                <>
                  <div className="auth__form-container_fields-content_input">
                      <label htmlFor="phoneNumber">Phone number</label>
                      <input 
                          name="phoneNumber"
                          type="text"
                          placeholder="Phone Number"
                          onChange={(evt) => handleChange(evt)}
                          required
                      />
                  </div>
                  <div className="auth__form-container_fields-content_input">
                      <label htmlFor="avatarURL">avatar URL</label>
                      <input 
                          name="avatarURL"
                          type="text"
                          placeholder="avatar URL"
                          onChange={(evt) => handleChange(evt)}
                          required
                      />
                  </div>
                </>
              )}
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="password">Password</label>
                <input 
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={(evt) => handleChange(evt)}
                    required
                />
              </div>
              {isSignup && (
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input 
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(evt) => handleChange(evt)}
                      required
                  />
                </div>
              )}
              <div className="auth__form-container_fields-content_button">
                <button type="submit">{isSignup ? "Sign up" : "Sign In"}</button>
              </div>
          </form>
  )
}

export default Form;