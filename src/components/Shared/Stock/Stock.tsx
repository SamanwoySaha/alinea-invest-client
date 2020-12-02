import React, { useEffect, useState } from 'react';
import './Stock.scss';
import axios from '../../../axios';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

interface StockPrice {
    askprice: number;
    bidprice: number;
}

const Stock: React.FC<any> = ({ stock, btn, addStock, handleReloadWatchlist }) => {
    const [stockDetail, setStockDetail] = useState<StockPrice>();
    const { pathname } = useLocation();

    const stockImage = stock.symbol === 'FB' ? 'https://i.imgur.com/l2qeDZ4.png'
        : stock.symbol === 'GOOGL' ? 'https://i.imgur.com/FR5L5MS.png'
            : stock.symbol === 'AAPL' ? 'https://i.imgur.com/NAyE6kc.png'
                : stock.symbol === 'AMZN' ? 'https://i.imgur.com/iUAb8t0.png'
                    : stock.symbol === 'MSFT' ? 'https://i.imgur.com/sBBSET4.png'
                        : '';
    const stockName = stock.symbol === 'FB' ? 'Facebook'
        : stock.symbol === 'GOOGL' ? 'Google'
            : stock.symbol === 'AAPL' ? 'Apple'
                : stock.symbol === 'AMZN' ? 'Amazon'
                    : stock.symbol === 'MSFT' ? 'Microsoft'
                        : '';

    useEffect(() => {
        axios(`/stockDetail/${stock.symbol}`)
            .then(res => {
                const { askprice, bidprice } = res.data.last;
                const stockInfo = { askprice, bidprice };
                setStockDetail(stockInfo);
            });
    }, []);

    const addStockHandler = () => {
        axios.post('/addStock', {symbol: stock.symbol})
            .then(res => console.log(res));
        handleReloadWatchlist();
    }

    const removeStockHandler = () => {
        axios.delete(`/removeStock/${stock.symbol}`)
            .then(res => console.log(res));
        handleReloadWatchlist();
    }

    return (
        <li className="d-flex justify-space-between align-items-center border-special">
            <div className="d-flex justify-space-between align-items-center">
                <img className="stock-image" src={`${stockImage}`} alt="" />
                <h5>{stockName}</h5>
            </div>
            <div className="ml-auto d-flex">
                {
                    stockDetail && <>
                        <div className="text-right d-flex flex-column">
                            <p><span className='askprice'>${stockDetail.askprice}</span> USD</p>
                            <p className={`bidprice ${stockDetail.askprice > stockDetail.bidprice ? 'red' : 'green'}`}>
                                {stockDetail.askprice > stockDetail.bidprice ? '-' : '+'}
                                {stockDetail.bidprice} ({((stockDetail.askprice / stockDetail.bidprice)).toFixed(2)}%)
                        </p>
                        </div>
                        { 
                            btn && addStock &&
                                <button onClick={addStockHandler} className="stock-btn"><AiOutlinePlusCircle /></button>
                        }
                        {
                            (btn === true && addStock === false) &&
                                <button onClick={removeStockHandler} className="stock-btn"><AiOutlineMinusCircle /></button>
                        }
                    </>
                }
            </div>
        </li>
    );
};

export default Stock;