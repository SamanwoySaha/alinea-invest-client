import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import Header from '../Shared/Header/Header';
import Stock from '../Shared/Stock/Stock';
import './WatchList.scss';
import { BsSearch } from 'react-icons/bs';
import axios from '../../axios';

const WatchList: React.FC = (ref) => {
    const searchTerm = useRef<HTMLInputElement>(null);
    const [stocklist, setStocklist] = useState([]); 

    const searchHanlder = (e: React.FormEvent) => {
        e.preventDefault();
        const searchText = searchTerm.current!.value!;
        console.log(searchText);
    }

    useEffect(() => {
        axios('/stocks')
            .then(res => {
                setStocklist(res.data);
            });
    }, []);

    return (
        <div>
            <Header></Header>
            <div className="watchlist container">
                <form onSubmit={searchHanlder} className="input-field form-control d-flex justify-space-between align-items-center">
                    <input className="form-control" id="search" type="text" placeholder="Search stocks to add to watchlist" ref={searchTerm}/>
                    <div className="ml-auto">
                        <button>X</button>
                        <button type="submit"><BsSearch /></button>
                    </div>
                </form>
                <h1 className="heading mt-5">Watchlist</h1>
                <ul className="mt-5">
                    <li className="d-flex justify-space-between align-items-center">
                        <h3 className="sub-heading">Watchlist</h3>
                        <h3 className="sub-heading ml-auto">Market price</h3>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default WatchList;