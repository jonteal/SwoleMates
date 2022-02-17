import React, {useState, useEffect } from "react";
import "./LoginForm.css";

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import SignupForm from '../../components/SignupForm/SignupForm';

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [login, {error}] = useMutation(LOGIN_USER);

    useEffect(() => {
        error ? setShowAlert(true) : setShowAlert(false);
    }, [error]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }

    try {
        const { data } = await login({
            variables: { ...userFormData},
    });

    Auth.login(data.login.token);

    } catch (err) {
        console.error(err);
    }

    setUserFormData({
        email: '',
        password: '',
    });
};

return (
    <>

        <div className="min-h-screen flex justify-center align-center mainLogin">
            <div className="bg-white p-16 rounded shadow-2xl w-2/3 loginCard">
                <h2 className="text-3x1 font-bold mb-10 text-center">Login!</h2>
                <form className="space-y-8" noValidate validated={validated} onSubmit={handleFormSubmit}>
                    {/* <alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong with your login credentials!
                    </alert> */}
                    <div>
                    <label className="block mb-2 font-bold" htmlFor='email'>Email</label>
                    <input
                        type='text'
                        placeholder='Your email'
                        name='email'
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                    {/* <label type='invalid'>Email is required!</label> */}
                    </div>

                    <div>
                    <label className="block mb-2 font-bold" htmlFor='password'>Password</label>
                    <input
                        type='password'
                        placeholder='Your password'
                        name='password'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                    {/* <label type='invalid'>Password is required!</label> */}
                    </div>
                    <button
                        disabled={!(userFormData.email && userFormData.password)}
                        type='submit'
                        variant='success'>
                        Submit
                    </button>
                    <p>Don't have an account? <span><a href={SignupForm}>Sign up!</a></span></p>
                </form>
            </div>

        </div>

    </>
);
};

export default LoginForm;
