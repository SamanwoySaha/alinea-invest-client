import React from 'react';
import Header from '../Shared/Header/Header';
import Stock from '../Shared/Stock/Stock';
import './Home.scss';

const Home: React.FC = () => {
    return (
        <div>
            <Header></Header>
            <h1>this is home</h1>
            <Stock></Stock>
        </div>
    );
};

export default Home;