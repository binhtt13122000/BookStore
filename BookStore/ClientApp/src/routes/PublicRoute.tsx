import * as React from 'react';
import { Route, Redirect } from 'react-router';
export const PublicRoute = (props: any) => {
    const { component: Component, ...rest } = props;
    console.log(localStorage && localStorage.getItem("loggedIn") === "1")
    return <Route {...rest} render={
        props => localStorage && localStorage.getItem("loggedIn") === "1" ? <Redirect from="*" to="/home" /> : <Component {...props} />} />
} 