import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Login from '../Shared/Login/Login';

const PrivateRoute: React.FC<any> = ({ children, ...rest }) => {
    const [modalShow, setModalShow] = useState(true);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                sessionStorage.getItem('email') ? (
                    children
                ) : (
                        <Login
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;