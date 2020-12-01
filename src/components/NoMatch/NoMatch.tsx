import React from 'react';
import Header from '../Shared/Header/Header';

const NoMatch = () => {
    return (
        <div>
            <Header></Header>
            <h1 className="text-center">404 error. Route not found</h1>
        </div>
    );
};

export default NoMatch;