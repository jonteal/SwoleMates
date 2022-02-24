import React, { Component } from 'react';
import Auth from '../../utils/auth';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = Auth.loggedIn()

    return (
        <Route
            {...rest} render={props => (
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: {from: props.location}}} />
                )
            )
            }
        />
    )
}

export default PrivateRoute