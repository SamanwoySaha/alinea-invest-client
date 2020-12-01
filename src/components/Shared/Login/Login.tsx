import Modal from 'react-bootstrap/Modal'
import React from 'react';
import './Login.scss';
import Button from 'react-bootstrap/Button';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useHistory } from 'react-router-dom';


(firebase.app.length) && firebase.initializeApp(firebaseConfig);


const Login: React.FC<any> = (props) => {
    const history = useHistory();
    
    const handleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function (result: any) {
                const { email, displayName, photoURL } = result.user;
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('name', displayName);
                sessionStorage.setItem('photo', photoURL);
                props.onHide();
                history.push('/watchlist');
            }).catch((error) => {
                console.log(error.message);
            });
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="d-flex login-modal-right align-items-center justify-content-center">
                    <h1 className="text-white text-center">Keep track of your<br />stocks</h1>
                </div>
                <div className="login-modal-left d-flex flex-column justify-content-center align-items-center">
                    <img src="https://i.imgur.com/xm76cBN.png" className="logo mb-3" alt="" />
                    <button onClick={handleLogin} className="login-btn">
                        <img src="https://img.icons8.com/color/50/000000/google-logo.png" alt="google-icon" />
                        <span>Continue with Google</span>
                    </button>
                    <Button className="modal-close-btn" onClick={props.onHide}>X</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Login;