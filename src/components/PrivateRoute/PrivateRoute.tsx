import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute: React.FC = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                sessionStorage.getItem('email') ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;