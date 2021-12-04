import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector } from "react-redux";
//import { isLogin } from '../utils';

const PrivateRoute = ({component: Component, ...rest}) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    let isLogin=false;
    if (currentUser !== null){
        isLogin=true;
    }
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin?
                <Component {...props} />
            : <Redirect to="/home" />
        )} />
    );
};

export default PrivateRoute;