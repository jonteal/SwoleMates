import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';




const SignupForm = () => {

    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: ''});

    const [validated] = useState(false);

    const [showAlert, setShowAlert] = useState(false);

    const [createUser, { data, error }] = useMutation(ADD_USER);

    useEffect(() => {
        error ? setShowAlert(true) : setShowAlert(false);
    }, [error]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
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
    } catch (err) {
        console.error(err);
    }

    setUserFormData({
        username: '',
        email: '',
        password: '',
    });
};

return (
    <>
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        
    </Form>
    </>
)
