import React from 'react';
import Header from '../Shared/Header/Header';
import Stock from '../Shared/Stock/Stock';
import './WatchList.scss';

const WatchList = () => {
    return (
        <div>
            <Header></Header>
            <h1>this is watchlist</h1>
            <Stock></Stock>
        </div>
    );
};

export default WatchList;