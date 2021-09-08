import React from 'react';
import { AuthContext } from '../context/context';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest}) => (
    <AuthContext.Consumer>
     {
        (auth)=>(
            <Route render={props=> auth.isAuth() ? <Component {...props} /> : <Redirect to="/login" />}
                {...rest}
            />
        )
    }
    </AuthContext.Consumer>
)

export default PrivateRoute;