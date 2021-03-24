import * as React from 'react';
import { Route, Redirect } from 'react-router';

export const PrivateRoute = (props: any) => {
    const { component: Component, ...rest } = props;
    return <Route {...rest} render={props => localStorage && localStorage.getItem("loggedIn") === "1" ? <Component {...props} /> : <Redirect from="*" to="/" />} />
}