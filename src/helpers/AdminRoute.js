import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './auth';


const AdminRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={
                props => isAuth() && isAuth().role === 'admin' ? (<Component {...props} />) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

export default AdminRoute;