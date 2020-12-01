import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import './Header.scss';

const Header: React.FC = () => {
    const [activeRoute, setActiveRoute] = useState('home');
    const [modalShow, setModalShow] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img className="logo" src='https://i.imgur.com/xm76cBN.png' alt="logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav ml-5">
                        <li className={`nav-item ${activeRoute === 'home' && 'active'}`}>
                            <Link onClick={() => setActiveRoute('home')} className="nav-link px-0" to="/home">Home</Link>
                        </li>
                        <li className={`nav-item ${activeRoute !== 'home' && 'active'}`}>
                            <Link onClick={() => setActiveRoute('watchlist')} className="nav-link px-0" to="/watchlist">Watchlist</Link>
                        </li>
                        {
                            sessionStorage.getItem('email')
                                ? <img className="special" src={`${sessionStorage.getItem('photo')}`} alt="user" />
                                : <button onClick={() => setModalShow(true)} className="login-btn">
                                    <img src="https://img.icons8.com/color/50/000000/google-logo.png" alt="google-icon" />
                                    <span>Continue with Google</span>
                                </button>
                        }
                    </ul>
                </div>
                <Login
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </nav>
    );
};

export default Header;