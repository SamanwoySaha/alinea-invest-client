import React, { useEffect, useRef, useState } from 'react';
import Header from '../Shared/Header/Header';
import Stock from '../Shared/Stock/Stock';
import './WatchList.scss';
import { BsSearch } from 'react-icons/bs';
import axios from '../../axios';

const WatchList: React.FC = () => {
    const searchTerm = useRef<HTMLInputElement>(null);
    const [searchResult, setSearchResult] = useState([]); 
    const [watchlist, setWatchlist] = useState([]);
    const [reloadWatchlist, setReloadWatchlist] = useState(false);

    const searchHanlder = (e: React.FormEvent) => {
        e.preventDefault();   
        axios(`/stockByName/${searchTerm.current!.value!}`)
            .then(res => {
                setSearchResult(res.data);
            });
    }

    useEffect(() => {
        axios('/watchlist')
            .then(res => setWatchlist(res.data))
    }, [reloadWatchlist]);

    const handleReloadWatchlist = () => {
        setReloadWatchlist(!reloadWatchlist);
    };

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
                <ul className="searchResult">
                    {
                        searchResult !== [] && 
                            searchResult.map((item: any) => <Stock key={item.name} handleReloadWatchlist={handleReloadWatchlist} btn={true} addStock={true} stock={item}></Stock>)
                    }
                </ul>
                <h1 className="heading mt-5">Watchlist</h1>
                <ul className="mt-5">
                    <li className="d-flex justify-space-between align-items-center">
                        <h3 className="sub-heading">Watchlist</h3>
                        <h3 className="sub-heading ml-auto">Market price</h3>
                    </li>
                    {
                        watchlist !== [] && 
                            watchlist.map((item: any) => <Stock key={item.name} handleReloadWatchlist={handleReloadWatchlist} btn={true} addStock={false} stock={item}></Stock>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default WatchList;