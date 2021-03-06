import React, { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
    checkPassword: ""
  });

  const [createUser, { data, error }] = useMutation(ADD_USER);
  const [validated] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [matchPasswordError, setMatchPasswordError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    setInputEmail(value);
  };

  const handleEmailCheck = (event) => {
    event.preventDefault();
    if (!/\S+@\S+\.\S+/.test(inputEmail)) {
      setEmailError('Please enter a valid email address!');
    } else {
      setEmailError("");
    }
  };

  const handlePasswordCheck = (event) => {
    event.preventDefault();
    userFormData.password === userFormData.checkPassword
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
    if (userFormData.password !== userFormData.checkPassword) {
      setMatchPasswordError("Your passwords do not match, try again");
    } else {
      setMatchPasswordError("");
    };
    userFormData.password === "" || userFormData.checkPassword === ""
      ? setPasswordMatch(false)
      : setPasswordError("");
    userFormData.password.length < 8
      ? setPasswordError("Password must be at least 8 characters.")
      : setPasswordError("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (passwordMatch === false) {
      return
    } 
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await createUser({
        variables: { ...userFormData },
      });

      Auth.login(data.createUser.token);
      window.location.pathname = "/profile";
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>

      <div className="min-h-screen max-h-screen max-w-screen flex justify-center items-center loginBg">
        <div className="xl:w-1/3 xl:h-1/2 w-10/12 h-10/12 loginCard">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="site__logo"
            width="56"
            height="84"
            viewBox="77.7 214.9 274.7 412"
          >
            <defs>
              <linearGradient id="a" x1="0%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#76D9F0" />
                <stop offset="100%" stopColor="#096479" />
              </linearGradient>
            </defs>
            <path
              fill="url(#a)"
              d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z"
            />
          </svg>

          <h2 className="text-3x1 font-bold mb-10 text-center font-fa loginTitle">
            SIGN UP
          </h2>

          <form className="space-y-3" validated={validated} onSubmit={handleFormSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email"></label>
              <input
                className="bg-gray-700 rounded-3xl border-1 border-black"
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleInputChange}
                value={userFormData.email}
                onBlur={handleEmailCheck}
                required
              />
              <p>{emailError}</p>
            </div>
            <div>
              {/* Password */}
              <label htmlFor="password"></label>
              <input
                className="bg-gray-700 rounded-3xl border-1 border-black"
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
                value={userFormData.password}
                onBlur={handlePasswordCheck}
                required
              />
            </div>
            <div>
              <label htmlFor="passwordCheck"></label>
              <input
                className="bg-gray-700 rounded-3xl border-1 border-black"
                type="password"
                placeholder="Confirm Password"
                name="checkPassword"
                onChange={handleInputChange}
                onBlur={handlePasswordCheck}
                value={userFormData.checkPassword}
                required
              />
              <p>{passwordError}</p>
              <p>{matchPasswordError}</p>
              {/* Submit Button */}
              <button
                disabled={!(userFormData.email && userFormData.password)}
                type="submit"
                variant="success"
                className="loginBtn"
              >
                Sign Up!
              </button>
            </div>
          </form>
          <p className="loginSignup">
            Already have an account?{" "}
            <span>
              <Link to="/login" className="underline cursor-pointer">
                Log in!
              </Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupForm;