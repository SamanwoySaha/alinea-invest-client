import React, { useEffect, useState } from 'react';
import Header from '../Shared/Header/Header';
import Stock from '../Shared/Stock/Stock';
import './Home.scss';
import axios from '../../axios';

const Home: React.FC = () => {
    const [stocklist, setStocklist] = useState([]);

    useEffect(() => {
        axios('/stocks')
            .then(res => {
                setStocklist(res.data);
            });
    }, []);

    return (
        <div>
            <Header></Header>
            <div className="home container">
                <h1 className="heading">Popular Stocks</h1>
                <ul className="mt-5">
                    <li className="d-flex justify-space-between align-items-center">
                        <h3 className="sub-heading">Company</h3>
                        <h3 className="sub-heading ml-auto">Market price</h3>
                    </li>
                    {
                        stocklist.map(item => <Stock stock={item}></Stock>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default Home;